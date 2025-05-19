document.addEventListener("DOMContentLoaded", () => {
  // Loading screen
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => loadingScreen.style.display = "none", 600);
  }, 1500); // 1.5s minimum loading

  // Fade in main elements
  document.getElementById("profile").classList.add("visible");
  document.getElementById("title").classList.add("visible");
  document.getElementById("subtitle").classList.add("visible");

  const links = document.querySelectorAll(".link-btn");
  const clickSound = document.getElementById("click-sound");

  links.forEach((btn, i) => {
    setTimeout(() => {
      btn.classList.add("visible");
    }, i * 150);

    btn.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });

  // Music toggle
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("toggle-music");
  toggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      music.pause();
      toggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });

  // Date-time ticker update
  const ticker = document.getElementById("date-time-ticker");
  function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString(undefined, { hour12: false });
    ticker.textContent = `🕒 ${timeStr} — 📅 ${dateStr} — Welcome to Arzaqie Link!`;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Particle effect on profile hover
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;
  const maxParticles = 60;

  function resizeCanvas() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
      this.opacity = 1;
      this.life = 60 + Math.random() * 30;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      this.opacity = this.life / 90;
    }
    draw() {
      ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    });
    animationId = requestAnimationFrame(animateParticles);
  }

  function emitParticles() {
    if (particles.length < maxParticles) {
      const rect = canvas.getBoundingClientRect();
      for(let i=0; i<5; i++) {
        const x = rect.width / 2 + (Math.random() - 0.5) * 60;
        const y = rect.height / 2 + (Math.random() - 0.5) * 60;
        particles.push(new Particle(x, y));
      }
    }
  }

  // Start and stop particle animation on hover
  const profileImg = document.getElementById("profile");
  profileImg.addEventListener("mouseenter", () => {
    emitParticles();
    animateParticles();
    particleInterval = setInterval(emitParticles, 100);
  });
  profileImg.addEventListener("mouseleave", () => {
    clearInterval(particleInterval);
    cancelAnimationFrame(animationId);
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  let particleInterval;

  // Audio visualizer
  const visualizerCanvas = document.getElementById("visualizer");
  const vCtx = visualizerCanvas.getContext("2d");

  function resizeVisualizer() {
    visualizerCanvas.width = visualizerCanvas.clientWidth * window.devicePixelRatio;
    visualizerCanvas.height = visualizerCanvas.clientHeight * window.devicePixelRatio;
    vCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resizeVisualizer();
  window.addEventListener("resize", resizeVisualizer);

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = document.getElementById("bg-music");
  const source = audioCtx.createMediaElementSource(audioElement);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 64;

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function drawVisualizer() {
    vCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    analyser.getByteFrequencyData(dataArray);

    const barWidth = visualizerCanvas.width / bufferLength;
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 2;
      const x = i * barWidth;
      vCtx.fillStyle = `rgba(0, 255, 225, ${dataArray[i] / 255})`;
      vCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth * 0.8, barHeight);
    }

    requestAnimationFrame(drawVisualizer);
  }

  // Unlock AudioContext on user gesture for browsers that require it
  function startAudioContext() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Resume audio context on first user interaction
  window.addEventListener("click", () => {
    startAudioContext();
  }, { once: true });

  drawVisualizer();
});
