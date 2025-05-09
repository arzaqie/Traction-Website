// Fungsi untuk menyalin IP ke clipboard
function copyIP() {
  const ip = document.getElementById("server-ip").innerText;
  navigator.clipboard.writeText(ip).then(() => {
    alert("IP berhasil disalin! Buka Minecraft dan klik Multiplayer.");
  });
}

// Kontainer Rank
const rankContainer = document.getElementById('rankContainer');
const rankCards = rankContainer.querySelectorAll('.rank-card');
let currentIndex = 0;

// Geser otomatis ke kiri
document.querySelector('.left-arrow').addEventListener('click', function() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = rankCards.length - 1;
  }
  updateRank();
});

// Geser otomatis ke kanan
document.querySelector('.right-arrow').addEventListener('click', function() {
  if (currentIndex < rankCards.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateRank();
});

// Fungsi untuk memperbarui tampilan rank berdasarkan currentIndex
function updateRank() {
  // Geser rank-container
  const offset = -currentIndex * 240; // 240px adalah lebar tiap card
  rankContainer.style.transform = `translateX(${offset}px)`;
}

// Setiap kali halaman dimuat, tampilkan rank pertama
updateRank();
