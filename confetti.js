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
        }, 5000);
    }

    if (!localStorage.getItem("birthdayShown")) {
        startConfetti();
        localStorage.setItem("birthdayShown", "true");
    }

    /* 🎵 MUSIC LOGIC */
    const music = document.getElementById("birthday-music");
    const overlay = document.getElementById("music-overlay");
    const playBtn = document.getElementById("play-music");

    if (!localStorage.getItem("musicPlayed")) {
        overlay.classList.remove("hidden");
    }

    playBtn.addEventListener("click", () => {
        music.play();
        overlay.classList.add("hidden");
        localStorage.setItem("musicPlayed", "true");
    });

});
