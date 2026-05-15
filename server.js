const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS — allow Cloudflare Pages frontend
app.use(cors({
    origin: [
        'https://validation-x-command-center.pages.dev',
        'http://localhost:8080',
        'http://localhost:3000',
        /\.pages\.dev$/,
        /\.onrender\.com$/
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kmanohar17072007@gmail.com',
        pass: 'qawwllyuxpntqbjl'
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'JARVIS_V7_API_ONLINE', version: '7.0.0' });
});

// Validate route — returns JSON
app.post('/validate', async (req, res) => {
    const { fullname, email, password, phone, message } = req.body;

    // Server-side validation
    if (!fullname || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            error: 'Incomplete transmission. All fields required.'
        });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email format.' });
    }

    // Basic phone check (min 7 digits)
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 7) {
        return res.status(400).json({ success: false, error: 'Invalid phone number.' });
    }

    console.log('Validated Transmission Received:', { fullname, email, phone });

    // Send tactical email
    const mailOptions = {
        from: '"JARVIS V7 Command Center" <kmanohar17072007@gmail.com>',
        to: 'kmanohar17072007@gmail.com',
        subject: `⚡ JARVIS V7 | New Mission from Agent ${fullname}`,
        html: `
        <div style="background:#02040a; color:#fff; padding:30px; font-family:monospace; border:2px solid #00FFFF; max-width:600px; margin:auto;">
            <h2 style="color:#00FFFF; letter-spacing:4px; text-transform:uppercase;">[ JARVIS_V7 TRANSMISSION ]</h2>
            <hr style="border-color:#00FFFF; opacity:0.3;">
            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                <tr>
                    <td style="color:#00FFFF; font-size:11px; letter-spacing:2px; padding:8px 0;">OPERATIVE</td>
                    <td style="color:#fff; font-weight:bold; padding:8px 0;">${fullname}</td>
                </tr>
                <tr>
                    <td style="color:#00FFFF; font-size:11px; letter-spacing:2px; padding:8px 0;">UPLINK</td>
                    <td style="color:#fff; font-weight:bold; padding:8px 0;">${email}</td>
                </tr>
                <tr>
                    <td style="color:#00FFFF; font-size:11px; letter-spacing:2px; padding:8px 0;">COMMS</td>
                    <td style="color:#fff; font-weight:bold; padding:8px 0;">${phone}</td>
                </tr>
            </table>
            <div style="margin-top:20px; padding:15px; border:1px dashed #00FFFF; background:rgba(0,255,255,0.05);">
                <div style="color:#00FFFF; font-size:11px; letter-spacing:2px; margin-bottom:8px;">MISSION_LOG:</div>
                <div style="color:#fff;">${message || 'NO MISSION NOTES PROVIDED'}</div>
            </div>
            <hr style="border-color:#00FFFF; opacity:0.3; margin-top:20px;">
            <p style="color:#BF00FF; font-size:11px; letter-spacing:2px;">[ STATUS: ACTIVE | SECTOR: ALPHA-7 | ENCRYPTION: SECURE_X ]</p>
        </div>`
    };

    // Send tactical email asynchronously (don't block the response)
    transporter.sendMail(mailOptions)
        .then(() => console.log(`📧 Email dispatched for Agent: ${fullname}`))
        .catch((err) => console.error('Email dispatch failed:', err.message));

    res.json({
        success: true,
        fullname,
        message: message || ''
    });
});

app.listen(PORT, () => {
    console.log(`JARVIS V7 API active on http://localhost:${PORT}`);
});
