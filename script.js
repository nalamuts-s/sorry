const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Tombol navigasi
document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
  });
});

// Membuka amplop
const envelope = document.getElementById("openEnvelope");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    showScreen("letter");
  }, 650);
});

// Gambar artwork berfungsi sebagai tombol play/pause lagu
const vinyl = document.getElementById("vinyl");
const song = document.getElementById("letterSong");
const musicCaption = document.getElementById("musicCaption");

vinyl.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      vinyl.classList.add("spinning");
      vinyl.setAttribute("aria-pressed", "true");
      musicCaption.textContent = "Now playing ♡ tap gambar untuk pause";
    } catch (error) {
      musicCaption.textContent = "Lagu belum bisa diputar. Coba tap lagi ya.";
    }
  } else {
    song.pause();
  }
});

song.addEventListener("pause", () => {
  vinyl.classList.remove("spinning");
  vinyl.setAttribute("aria-pressed", "false");
  musicCaption.textContent = "Lagu dijeda — tap gambar untuk memutar lagi ♡";
});

song.addEventListener("ended", () => {
  vinyl.classList.remove("spinning");
  vinyl.setAttribute("aria-pressed", "false");
  musicCaption.textContent = "Lagu selesai ♡ tap gambar untuk memutar lagi";
});
