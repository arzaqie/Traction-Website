window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.profile-img').classList.add('visible');
  document.querySelector('h2').classList.add('visible');
  document.querySelector('p').classList.add('visible');

  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach((btn, i) => {
    setTimeout(() => {
      btn.classList.add('visible');
    }, i * 150); // Efek animasi bergantian
  });
});