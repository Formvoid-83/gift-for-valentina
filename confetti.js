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
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10
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

    updateConfetti();
}

function updateConfetti() {
    confetti.forEach(c => {
        c.y += Math.cos(c.d) + 2;
        c.x += Math.sin(c.d);
        if (c.y > canvas.height) {
            c.y = -10;
        }
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
