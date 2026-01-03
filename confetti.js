document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#f7a8c9", "#fde7f3", "#c084fc", "#fbcfe8"];
    const confettiCount = 150;

    let confetti = [];

    function createConfetti() {
        confetti = [];
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 4,
                d: Math.random() * confettiCount,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.fillStyle = c.color;
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
        });

        confetti.forEach(c => {
            c.y += 2;
            if (c.y > canvas.height) c.y = -10;
        });
    }

    function startConfetti() {
        createConfetti();
        const interval = setInterval(drawConfetti, 16);

        setTimeout(() => {
            clearInterval(interval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 10000);
    }

        startConfetti();

    /* 🎵 MUSIC LOGIC */
    const music = document.getElementById("birthday-music");
    const playBtn = document.getElementById("play-music");
    
    playBtn.addEventListener("click", () => {
        if (!music.paused) return;
    
        music.volume = 0;
        music.play();
        playBtn.disabled = true;
    
        let v = 0;
        const fade = setInterval(() => {
            if (v < 0.6) {
                v += 0.02;
                music.volume = v;
            } else {
                clearInterval(fade);
            }
        }, 100);
    });
    
    /* When music finishes */
    music.addEventListener("ended", () => {
        playBtn.disabled = false;
    });


});
