// Fungsi untuk menyalin IP ke clipboard
function copyIP() {
  const ip = document.getElementById("server-ip").innerText;
  navigator.clipboard.writeText(ip).then(() => {
    alert("IP berhasil disalin! Buka Minecraft dan klik Multiplayer.");
  });
}

// Geser otomatis ke kiri
document.querySelector('.left-arrow').addEventListener('click', function() {
  const container = document.querySelector('.rank-container');
  container.scrollBy({ left: -200, behavior: 'smooth' }); // Geser ke kiri
});

// Geser otomatis ke kanan
document.querySelector('.right-arrow').addEventListener('click', function() {
  const container = document.querySelector('.rank-container');
  container.scrollBy({ left: 200, behavior: 'smooth' }); // Geser ke kanan
});