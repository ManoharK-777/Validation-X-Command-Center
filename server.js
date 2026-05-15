const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kmanohar17072007@gmail.com',
        pass: 'qawwllyuxpntqbjl'
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/validate', async (req, res) => {
    const { fullname, email, password, phone, message } = req.body;

    // Server-side validation
    if (!fullname || !email || !password || !phone) {
        return res.status(400).send('Incomplete transmission. Data loss detected.');
    }

    console.log('Validated Transmission Received:', { fullname, email, phone });

    // Send email notification
    const mailOptions = {
        from: '"JARVIS V7 Command Center" <kmanohar17072007@gmail.com>',
        to: 'kmanohar17072007@gmail.com',
        subject: `⚡ JARVIS V7 | New Mission Received from Agent ${fullname}`,
        html: `
        <div style="background:#02040a; color:#fff; padding:30px; font-family:monospace; border:2px solid #00FFFF; max-width:600px; margin:auto;">
            <h2 style="color:#00FFFF; letter-spacing:4px; text-transform:uppercase;">[ JARVIS_V7 TRANSMISSION ]</h2>
            <hr style="border-color:#00FFFF; opacity:0.3;">
            
            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                <tr>
                    <td style="color:#00FFFF; font-size:11px; letter-spacing:2px; padding:8px 0;">OPERATIVE IDENTIFIER</td>
                    <td style="color:#fff; font-weight:bold; padding:8px 0;">${fullname}</td>
                </tr>
                <tr>
                    <td style="color:#00FFFF; font-size:11px; letter-spacing:2px; padding:8px 0;">SECURE UPLINK</td>
                    <td style="color:#fff; font-weight:bold; padding:8px 0;">${email}</td>
                </tr>
                <tr>
                    <td style="color:#00FFFF; font-size:11px; letter-spacing:2px; padding:8px 0;">COMMS CHANNEL</td>
                    <td style="color:#fff; font-weight:bold; padding:8px 0;">${phone}</td>
                </tr>
            </table>

            <div style="margin-top:20px; padding:15px; border:1px dashed #00FFFF; background:rgba(0,255,255,0.05);">
                <div style="color:#00FFFF; font-size:11px; letter-spacing:2px; margin-bottom:8px;">DECRYPTED_MISSION_LOG:</div>
                <div style="color:#fff;">${message || 'NO MISSION NOTES PROVIDED'}</div>
            </div>

            <hr style="border-color:#00FFFF; opacity:0.3; margin-top:20px;">
            <p style="color:#BF00FF; font-size:11px; letter-spacing:2px;">[ STATUS: ACTIVE | SECTOR: ALPHA-7 | ENCRYPTION: SECURE_X ]</p>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email dispatched to kmanohar17072007@gmail.com for Agent: ${fullname}`);
    } catch (err) {
        console.error('Email dispatch failed:', err.message);
    }

    res.render('success', { fullname, message: message || "" });
});

app.listen(PORT, () => {
    console.log(`Command Center active on http://localhost:${PORT}`);
});
