# JARVIS V7 | Tactical Intelligence Command Center

A cinematic, Jarvis-inspired AI Validation Command Center with a split architecture — **REST API backend** on Render and **static frontend** on Cloudflare Pages.

## 🌐 Live Deployment

| Layer | URL |
|---|---|
| **Frontend** | [Cloudflare Pages](https://validation-x-command-center.pages.dev) |
| **Backend API** | [Render](https://validation-x-command-center.onrender.com) |

## 🚀 Features

- **JARVIS V7 HUD** — Neo-Tactical dark UI with glassmorphism & animated holographic elements
- **3D Rotating Globe** — Full wireframe holographic globe widget with 6-axis rings
- **DNA Helix Animation** — Bio-scan matrix with animated DNA sequence
- **Dual Core-Sync Circles** — Concentric rotating rings for neural processing display
- **Form Validation** — Client-side + server-side validation with animated transitions
- **Email Notifications** — Tactical mission briefing sent via Gmail (Nodemailer) on every submission
- **Mission Secured Page** — Red-stamp "ACCEPTED" confirmation with decrypted mission log
- **Precision Cursor** — Blue tactical plus (+) crosshair cursor with centered glow dot

## 🏗️ Architecture

```
┌──────────────────────┐         ┌──────────────────────┐
│   Cloudflare Pages   │  fetch  │       Render          │
│   (Static Frontend)  │ ──────> │   (Express REST API)  │
│                      │  JSON   │                       │
│  index.html          │ <────── │  POST /validate       │
│  success.html        │         │  → Validates data     │
│  style.css           │         │  → Sends email        │
│  script.js           │         │  → Returns JSON       │
└──────────────────────┘         └──────────────────────┘
```

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JS |
| **Backend** | Node.js, Express.js |
| **Email** | Nodemailer (Gmail SMTP) |
| **Styling** | Custom HUD Design System |
| **Fonts** | Orbitron, JetBrains Mono |
| **Hosting** | Cloudflare Pages + Render |

## 📁 Project Structure

```
├── frontend/              # Cloudflare Pages (static)
│   ├── index.html         # Main Dashboard
│   ├── success.html       # Mission Secured Page
│   ├── style.css          # HUD Design System
│   └── script.js          # Cursor, Animations & API calls
├── server.js              # Express REST API (Render)
├── package.json
└── README.md
```

## ⚙️ Local Development

```bash
# Start backend API
npm install
npm start
# API runs at http://localhost:3000

# Open frontend separately
# Open frontend/index.html in browser
```

## 📧 Email Integration

Every form submission triggers a tactical email to the configured inbox with:
- Agent operative name
- Secure uplink (email)
- Comms channel (phone)
- Decrypted mission log (notes)
