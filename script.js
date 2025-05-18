// Animasi muncul saat dimuat
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.profile-img').classList.add('visible');
  document.querySelector('h2').classList.add('visible');
  document.querySelector('p').classList.add('visible');

  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach((btn, i) => {
    setTimeout(() => {
      btn.classList.add('visible');
    }, i * 150);
  });
});

// Musik toggle
const audio = document.getElementById('bgm');
const toggleBtn = document.getElementById('music-toggle');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

toggleBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'inline';
  } else {
    audio.pause();
    iconPlay.style.display = 'inline';
    iconPause.style.display = 'none';
  }
});

// … kode animasi muncul …

// Inisialisasi efek klik
const clickSfx = document.getElementById('click-sfx');
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset posisi audio, lalu play
    clickSfx.currentTime = 0;
    clickSfx.play();
  });
});
