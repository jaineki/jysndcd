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

// SoundCloud Search API Proxy
app.get('/api/search/soundcloud', async (req, res) => {
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

// SoundCloud Downloader API Proxy
app.post('/api/downloader/soundcloud-v2', async (req, res) => {
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
