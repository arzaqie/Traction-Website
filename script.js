window.addEventListener('DOMContentLoaded', () => {
  // Animasi muncul
  document.querySelector('.profile-img').classList.add('visible');
  document.querySelector('h2').classList.add('visible');
  document.querySelector('p').classList.add('visible');

  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach((btn, i) => {
    setTimeout(() => btn.classList.add('visible'), i * 150);
  });

  // Suara klik
  const clickSfx = document.getElementById('click-sfx');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      clickSfx.currentTime = 0;
      clickSfx.play();
    });
  });

  // Tombol musik
  const bgm = document.getElementById('bgm');
  const toggleBtn = document.getElementById('toggle-music');

  let playing = false;
  toggleBtn.addEventListener('click', () => {
    if (playing) {
      bgm.pause();
      toggleBtn.textContent = '🔇';
    } else {
      bgm.play();
      toggleBtn.textContent = '🔊';
    }
    playing = !playing;
  });
});
