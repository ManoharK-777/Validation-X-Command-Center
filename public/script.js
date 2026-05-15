document.addEventListener('DOMContentLoaded', () => {
    const cursorCrosshair = document.getElementById('cursorCrosshair');
    const cursorDot = document.getElementById('cursorDot');
    const mainPanel = document.getElementById('mainPanel');
    const neuralFeed = document.getElementById('neuralFeed');
    const packetLog = document.getElementById('packetLog');
    const systemLog = document.getElementById('systemLog');
    const form = document.getElementById('validationForm');
    const submitBtn = document.getElementById('submitBtn');

    // --- Tactical Cursor ---
    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        cursorDot.style.left = x + 'px';
        cursorDot.style.top = y + 'px';
        requestAnimationFrame(() => {
            cursorCrosshair.style.left = (x - 15) + 'px';
            cursorCrosshair.style.top = (15 - y) + 'px'; // Inverted Y for tactical feel
            cursorCrosshair.style.left = (x - 15) + 'px';
            cursorCrosshair.style.top = (y - 15) + 'px';
        });
    });

    // --- Data Stream Logic ---
    const hexCodes = ["0x4F", "0x9B", "0x1C", "0x8D", "0xE2", "0xA7", "0x33", "0xF1"];
    setInterval(() => {
        const code = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        
        // Update Packet Feed
        const pLine = document.createElement('div');
        pLine.textContent = `> [${code}] PACKET_RECV...`;
        packetLog.appendChild(pLine);
        if (packetLog.childNodes.length > 3) packetLog.removeChild(packetLog.firstChild);

        // Update System Log
        systemLog.textContent = `> [${code}] SECURE_HANDSHAKE_VERIFIED_${Math.floor(Math.random()*1000)}`;

        // Neural Sync Pulse
        if(neuralFeed) {
            const bars = neuralFeed.querySelectorAll('div');
            bars.forEach(bar => {
                bar.style.opacity = Math.random() * 0.8 + 0.2;
            });
        }
    }, 600);

    // --- 3D Tactical Tilt ---
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 80;
        const y = (window.innerHeight / 2 - e.clientY) / 80;
        mainPanel.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // --- Mission Logic ---
    form.addEventListener('submit', () => {
        submitBtn.textContent = "UPLOADING...";
        submitBtn.style.background = "#fff";
        submitBtn.style.color = "#000";
        submitBtn.style.boxShadow = "0 0 50px #fff";
    });
});
