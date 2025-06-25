//add ur music in the music folder and change the names here
const songs = [
  {
    name: "song1.mp3",
    title: "Non-Stop",
    artist: "Hamilton"
  },
  {
    name: "song2.mp3",
    title: "Acrobatic Silky OST",
    artist: "Melodic Blaze"
  },
  {
    name: "song3.mp3",
    title: "Numb Little Bug",
    artist: "Em Beihold"
  }
];

const progress = document.getElementById("progress");

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

let isPlaying = false;
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
  isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  if (isPlaying) playSong();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  if (isPlaying) playSong();
});

function updateProgressBackground(value) {
  progress.style.background = `linear-gradient(to right, #f72585 0%, #f72585 ${value}%, #444 ${value}%, #444 100%)`;
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
    updateProgressBackground(progressPercent);
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    updateProgressBackground(progress.value);
  }
});

updateProgressBackground(0);

loadSong(songs[index]);
