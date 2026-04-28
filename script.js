const canvas = document.getElementById('record-canvas');
const ctx = canvas.getContext('2d');
const audio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');
const loader = document.getElementById('loader');
const eraTitle = document.getElementById('era-title');
const eraDesc = document.getElementById('era-desc');
const eraBtns = document.querySelectorAll('.era-btn');

let rotation = 0;
let rotationSpeed = 0.05;
let isPlaying = false;

const eras = {
    '1950': { title: '1950s ROCK & ROLL', desc: 'The birth of cool. Jukeboxes and electric guitars.', color: '#f4a261', speed: 0.03 },
    '1970': { title: '1970s DISCO FEVER', desc: 'Mirror balls and the rise of the dance floor.', color: '#e9c46a', speed: 0.06 },
    '1980': { title: '1980s SYNTHWAVE', desc: 'Neon lights and fat analog synthesizers.', color: '#ff0055', speed: 0.05 },
    '1990': { title: '1990s GRUNGE', desc: 'Alternative spirits and garage bands.', color: '#2a9d8f', speed: 0.07 },
    '2026': { title: 'MODERN AI-CORE', desc: 'Neural-generated beats and machine rhythm.', color: '#00f2ff', speed: 0.04 },
    '2077': { title: '2077 CYBERPUNK', desc: 'Dystopian glitches and neon rain.', color: '#7209b7', speed: 0.02 }
};

function init() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // SAFETY TIMEOUT: Ensure loader disappears
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = canvas.width * 0.4;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    // Record
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#111';
    ctx.fill();
    
    // Grooves
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * (0.4 + i * 0.06), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.stroke();
    }

    // Label
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.fill();

    ctx.restore();

    if (isPlaying) rotation += rotationSpeed;
    requestAnimationFrame(draw);
}

eraBtns.forEach(btn => {
    btn.onclick = () => {
        eraBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const era = eras[btn.dataset.era];
        eraTitle.textContent = era.title;
        eraTitle.style.color = era.color;
        eraDesc.textContent = era.desc;
        rotationSpeed = era.speed;
        document.documentElement.style.setProperty('--primary', era.color);
    };
});

audioToggle.onclick = () => {
    if (isPlaying) {
        audio.pause();
        audioToggle.textContent = '🎵';
    } else {
        audio.play().catch(() => console.log('Audio blocked'));
        audioToggle.textContent = '🔊';
    }
    isPlaying = !isPlaying;
};

window.addEventListener('load', init);
// Fallback if load event doesn't fire
setTimeout(init, 5000);