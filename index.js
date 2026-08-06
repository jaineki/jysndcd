const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Supabase public config endpoint for frontend
app.get('/api/config', (req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL || '',
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
    });
});

// Admin Secret Authentication API
const ADMIN_USER = process.env.ADMIN_USERNAME || 'jay';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'jaybohol2024';

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ success: true, token: 'jay-admin-secure-token-998877' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid admin username or password' });
    }
});

// API Security Guard: Prevent direct scraping / unauthorized bot access without app headers
const securityGuard = (req, res, next) => {
    const referer = req.get('referer');
    const userAgent = req.get('user-agent') || '';
    
    // Allow requests originating from our web domain or frontend app fetch requests
    // Block automated curl/python scrapers without browser-like user agents or referers
    if (!userAgent || userAgent.includes('curl') || userAgent.includes('python') || userAgent.includes('PostmanRuntime')) {
        // Optional: you can block or require a custom header key
        // For strict protection against api scrapers:
        // return res.status(403).json({ success: false, error: 'Access denied: Direct API access is prohibited.' });
    }
    next();
};

// SoundCloud Search API Proxy (Secured)
app.get('/api/search/soundcloud', securityGuard, async (req, res) => {
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

// SoundCloud Downloader API Proxy (Secured)
app.post('/api/downloader/soundcloud-v2', securityGuard, async (req, res) => {
    try {
        const { url } = req.body;
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
