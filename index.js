const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

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
        supabaseAnonKey: SUPABASE_ANON_KEY
    });
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
    } catch (error) {
        console.error('Search API Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch search results from SoundCloud API' });
    }
});

app.post('/api/downloader/soundcloud-v2', apiLimiter, securityGuard, async (req, res) => {
    try {
        const { url } = req.body || {};
        if (!url) {
            return res.status(400).json({ success: false, error: 'URL is required' });
        }
        const response = await fetch('https://rest-apins.vercel.app/api/downloader/soundcloud-v2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        res.json(data);
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
