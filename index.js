const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const discovery = require('./discovery');

const app = express();
const PORT = process.env.PORT || 3000;

// Render sits behind a reverse proxy, so trust its X-Forwarded-For header to
// get the real client IP (needed for express-rate-limit to work correctly).
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------------------
// Supabase clients
// ---------------------------------------------------------------------------
// Public (anon) config for the browser — used only for customer auth (login/
// signup) on the main site. Never used for the admin panel anymore.
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// Server-side admin client using the service_role key. This key bypasses RLS
// entirely, so it must NEVER be sent to the browser — it only ever lives here,
// on the server, read from an environment variable.
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
let supabaseAdmin = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false }
    });
} else {
    console.error('WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Admin endpoints will not work.');
}

app.get('/api/config', (req, res) => {
    res.json({
        supabaseUrl: SUPABASE_URL,
        supabaseAnonKey: SUPABASE_ANON_KEY,
        freeDailyPlays: FREE_DAILY_PLAYS,
        premiumPromoDays: PREMIUM_PROMO_DAYS
    });
});

// ---------------------------------------------------------------------------
// Authenticated listener accounts and playback protection
// ---------------------------------------------------------------------------
const FREE_DAILY_PLAYS = Math.max(1, Number.parseInt(process.env.JAY_FREE_DAILY_PLAYS || '10', 10));
const PREMIUM_PROMO_CODE = String(process.env.JAY_PREMIUM_PROMO_CODE || 'ORANGE10').trim().toUpperCase();
const PREMIUM_PROMO_DAYS = Math.max(1, Number.parseInt(process.env.JAY_PREMIUM_PROMO_DAYS || '7', 10));

async function requireUser(req, res, next) {
    const authHeader = req.get('authorization') || '';
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!accessToken || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
        return res.status(401).json({ success: false, code: 'AUTH_REQUIRED', error: 'Sign in to continue.' });
    }
    try {
        const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
        const { data, error } = await authClient.auth.getUser(accessToken);
        if (error || !data?.user) throw new Error('Invalid Supabase session');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, code: 'AUTH_REQUIRED', error: 'Your session expired. Please sign in again.' });
    }
}

async function getEntitlement(user) {
    if (!supabaseAdmin || !user?.id) return { tier: 'free', premium_until: null };
    const { data: entitlement } = await supabaseAdmin
        .from('user_entitlements')
        .select('tier,premium_until')
        .eq('user_id', user.id)
        .maybeSingle();
    if (entitlement) return entitlement;
    // Keep compatibility with the existing admin subscription table.
    const { data: subscription } = await supabaseAdmin
        .from('subcription')
        .select('tier,updated_at')
        .eq('email', String(user.email || '').toLowerCase())
        .maybeSingle();
    return subscription ? { tier: subscription.tier, premium_until: null } : { tier: 'free', premium_until: null };
}

function accountQuotaDevice(req) {
    // A browser-generated device ID is retained for audit headers, but it is
    // intentionally not used as the quota key. The quota is account-scoped so
    // clearing storage, changing browsers, or spoofing a device ID cannot reset it.
    const reportedDeviceId = String(req.get('x-device-id') || 'unknown-device');
    return crypto.createHash('sha256').update(reportedDeviceId).digest('hex').slice(0, 32);
}

async function consumePlaybackQuota(req, user) {
    if (!supabaseAdmin) return { allowed: false, error: 'Playback protection is not configured. Run the Supabase migration first.' };
    const entitlement = await getEntitlement(user);
    const isPremium = ['starter', 'popular', 'premium'].includes(String(entitlement.tier || '').toLowerCase()) || (entitlement.premium_until && new Date(entitlement.premium_until).getTime() > Date.now());
    if (isPremium) return { allowed: true, play_count: 0, daily_limit: FREE_DAILY_PLAYS, tier: entitlement.tier, premium_until: entitlement.premium_until };

    const { data, error } = await supabaseAdmin.rpc('consume_daily_play', {
        p_user_id: user.id,
        // Account-scoped quota is the anti-bypass boundary. The reported device
        // hash is available in request logs, but cannot create extra allowance.
        p_device_hash: 'account',
        p_daily_limit: FREE_DAILY_PLAYS,
        p_session_id: String(req.get('x-play-session-id') || ''),
        p_track_key: String(req.get('x-play-track-key') || '')
    });
    if (error) return { allowed: false, error: 'Playback protection is unavailable. Please try again later.' };
    const row = Array.isArray(data) ? data[0] : data;
    return { allowed: Boolean(row?.allowed), play_count: Number(row?.play_count || 0), daily_limit: Number(row?.daily_limit || FREE_DAILY_PLAYS), tier: row?.tier || 'free', premium_until: row?.premium_until || null, device_hash: accountQuotaDevice(req) };
}

app.get('/api/account/status', requireUser, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'Account database is not configured.' });
    const entitlement = await getEntitlement(req.user);
    const { data: quota } = await supabaseAdmin
        .from('playback_quotas')
        .select('play_count,usage_date')
        .eq('user_id', req.user.id)
        .eq('device_hash', 'account')
        .eq('usage_date', new Date().toISOString().slice(0, 10))
        .maybeSingle();
    const premium = ['starter', 'popular', 'premium'].includes(String(entitlement.tier || '').toLowerCase()) || (entitlement.premium_until && new Date(entitlement.premium_until).getTime() > Date.now());
    res.json({ success: true, user: { id: req.user.id, email: req.user.email }, tier: entitlement.tier || 'free', premium_until: entitlement.premium_until || null, premium, play_count: Number(quota?.play_count || 0), daily_limit: FREE_DAILY_PLAYS });
});

app.post('/api/account/redeem-promo', requireUser, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'Account database is not configured.' });
    const code = String(req.body?.code || '').trim().toUpperCase();
    if (!code || code !== PREMIUM_PROMO_CODE) return res.status(400).json({ success: false, error: 'That promo code is not valid.' });
    const premiumUntil = new Date(Date.now() + PREMIUM_PROMO_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { error } = await supabaseAdmin.from('user_entitlements').upsert({ user_id: req.user.id, tier: 'premium', promo_code: code, premium_until: premiumUntil, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (error) return res.status(500).json({ success: false, error: 'Could not activate the promo. Run the Supabase migration first.' });
    res.json({ success: true, tier: 'premium', premium_until: premiumUntil, promo_days: PREMIUM_PROMO_DAYS });
});

// ---------------------------------------------------------------------------
// Admin auth
// ---------------------------------------------------------------------------
const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.ADMIN_JWT_SECRET;

if (!ADMIN_USER || !ADMIN_PASS) {
    console.error('WARNING: ADMIN_USERNAME / ADMIN_PASSWORD are not set. Admin login is disabled until they are.');
}
if (!JWT_SECRET) {
    console.error('WARNING: ADMIN_JWT_SECRET is not set. Admin login is disabled until it is.');
}

// Limit login attempts to slow down brute-forcing of the admin password.
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many login attempts. Try again later.' }
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
    if (!ADMIN_USER || !ADMIN_PASS || !JWT_SECRET) {
        return res.status(503).json({ success: false, error: 'Admin login is not configured on the server.' });
    }
    const { username, password } = req.body || {};
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, error: 'Invalid admin username or password' });
});

// Verifies a real, signed, expiring admin session token on every protected
// request — the frontend can no longer just claim to be an admin.
function requireAdmin(req, res, next) {
    const authHeader = req.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token || !JWT_SECRET) {
        return res.status(401).json({ success: false, error: 'Missing or invalid admin session.' });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (payload.role !== 'admin') throw new Error('not admin');
        req.admin = payload;
        next();
    } catch (e) {
        return res.status(401).json({ success: false, error: 'Session expired or invalid. Please log in again.' });
    }
}

// ---------------------------------------------------------------------------
// Admin subscription management — all writes happen server-side with the
// service_role key. The browser never talks to Supabase directly for this.
// ---------------------------------------------------------------------------
const ALLOWED_TIERS = ['starter', 'popular', 'premium', 'free'];

app.get('/api/admin/subscriptions', requireAdmin, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'Admin DB client not configured.' });
    const { data, error } = await supabaseAdmin
        .from('subcription')
        .select('*')
        .order('updated_at', { ascending: false });
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, data });
});

app.post('/api/admin/subscriptions', requireAdmin, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'Admin DB client not configured.' });
    const email = String(req.body?.email || '').trim().toLowerCase();
    const tier = String(req.body?.tier || '').trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email address.' });
    }
    if (!ALLOWED_TIERS.includes(tier)) {
        return res.status(400).json({ success: false, error: 'Invalid tier.' });
    }

    const { error } = await supabaseAdmin
        .from('subcription')
        .upsert({ email, tier, updated_at: new Date().toISOString() }, { onConflict: 'email' });

    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true });
});

app.delete('/api/admin/subscriptions/:email', requireAdmin, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'Admin DB client not configured.' });
    const email = String(req.params.email || '').trim().toLowerCase();
    const { error } = await supabaseAdmin.from('subcription').delete().eq('email', email);
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true });
});

// ---------------------------------------------------------------------------
// Third-party API proxies
// ---------------------------------------------------------------------------
const securityGuard = (req, res, next) => {
    const userAgent = req.get('user-agent') || '';
    const blockedAgents = ['curl', 'python', 'postmanruntime', 'wget', 'axios', 'go-http-client'];
    const uaLower = userAgent.toLowerCase();
    if (!userAgent || blockedAgents.some(b => uaLower.includes(b))) {
        return res.status(403).json({ success: false, error: 'Access denied: direct API access is prohibited.' });
    }
    next();
};

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false
});

app.get('/api/search/soundcloud', apiLimiter, securityGuard, async (req, res) => {
    const query = req.query.q || 'lofi';
    const limit = req.query.limit || 12;
    try {
        const response = await fetch(`https://rest-apins.vercel.app/api/search/soundcloud?q=${encodeURIComponent(query)}&limit=${limit}`);
        const data = await response.json();
        res.json(data);

        // Fire-and-forget: cache track metadata (title/artist/duration/plays/
        // url/thumbnail — same shape the frontend already reads) so the
        // discovery features have something to rank.
        if (supabaseAdmin && Array.isArray(data?.result)) {
            discovery.upsertManyTrackCache(supabaseAdmin, data.result);
        }
    } catch (error) {
        console.error('Search API Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch search results from SoundCloud API' });
    }
});

// Called by the frontend from streamAndPlayTrack() right when a track
// starts playing. Logs a play event and (re)caches the track's metadata so
// trending / popular artists / recommendations stay accurate.
app.post('/api/discovery/log-play', apiLimiter, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'DB not configured.' });
    const { track_id, title, artist, duration, thumbnail, url } = req.body || {};
    const id = discovery.normalizeId({ track_id, url });
    if (!id) return res.status(400).json({ success: false, error: 'track_id or url is required' });

    await discovery.upsertTrackCache(supabaseAdmin, { track_id: id, title, artist, duration, thumbnail, url });
    await discovery.logPlay(supabaseAdmin, id);
    res.json({ success: true });
});

// ---------------------------------------------------------------------------
// Discovery: trending, popular artists, recommendations, radio
// ---------------------------------------------------------------------------
app.get('/api/discovery/trending', apiLimiter, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'DB not configured.' });
    const limit = parseInt(req.query.limit, 10) || 20;
    const data = await discovery.getTrendingTracks(supabaseAdmin, limit);
    res.json({ success: true, data });
});

app.get('/api/discovery/popular-artists', apiLimiter, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'DB not configured.' });
    const limit = parseInt(req.query.limit, 10) || 20;
    const data = await discovery.getPopularArtists(supabaseAdmin, limit);
    res.json({ success: true, data });
});

app.get('/api/discovery/popular-songs', apiLimiter, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'DB not configured.' });
    const limit = parseInt(req.query.limit, 10) || 20;
    const data = await discovery.getPopularSongs(supabaseAdmin, limit);
    res.json({ success: true, data });
});

app.get('/api/discovery/recommendations/:trackId', apiLimiter, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'DB not configured.' });
    const limit = parseInt(req.query.limit, 10) || 10;
    const data = await discovery.getRecommendations(supabaseAdmin, req.params.trackId, limit);
    res.json({ success: true, data });
});

app.get('/api/discovery/radio/:trackId', apiLimiter, async (req, res) => {
    if (!supabaseAdmin) return res.status(503).json({ success: false, error: 'DB not configured.' });
    const length = parseInt(req.query.length, 10) || 30;
    const data = await discovery.generateRadioQueue(supabaseAdmin, req.params.trackId, length);
    res.json({ success: true, data });
});

app.post('/api/downloader/soundcloud-v2', apiLimiter, securityGuard, requireUser, async (req, res) => {
    try {
        const { url } = req.body || {};
        if (!url) {
            return res.status(400).json({ success: false, error: 'URL is required' });
        }
        const quota = await consumePlaybackQuota(req, req.user);
        if (!quota.allowed) {
            return res.status(429).json({ success: false, code: quota.error ? 'PLAYBACK_PROTECTION_UNAVAILABLE' : 'DAILY_LIMIT_REACHED', error: quota.error || `You have reached today’s ${quota.daily_limit}-song limit. Try again tomorrow or activate Premium.`, quota });
        }
        const response = await fetch('https://rest-apins.vercel.app/api/downloader/soundcloud-v2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        res.json({ ...data, quota });
    } catch (error) {
        console.error('Downloader API Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch download/stream URL' });
    }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`JaySoundCloud backend running on port ${PORT}`);
});
