// =========================
//  now playin (plz dont forget to change api)
// =========================

const username = "er1kv";
const apiKey = "6a807c3ca61e71d343a89a9dd55a978b";
const albumArt = document.getElementById('albumArt');
const trackTitle = document.getElementById("trackTitle");
const artistName = document.getElementById("artistName");

async function fetchNowPlaying() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    );
    const data = await res.json();
    const track = data.recenttracks.track[0];
    const isNowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";

    if (track && isNowPlaying) {
      trackTitle.textContent = track.name;
      artistName.textContent = track.artist["#text"];

      let imageUrl = track.image?.[3]['#text'];
      if (!imageUrl) imageUrl = 'default.webp';

      albumArt.src = imageUrl;

      albumArt.onerror = () => {
        albumArt.src = 'default.webp';
      };
    } else {
      trackTitle.textContent = "I'm not listening to music right now.";
      artistName.textContent = "";
      albumArt.src = 'default.webp';
    }
  } catch (err) {
    console.error("ошибка загрузки трека:", err);
    trackTitle.textContent = "I'm not listening to music right now.";
    artistName.textContent = "";
    albumArt.src = 'default.webp';
  }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 15000);


// =========================
//  phrase generator 3000
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "this site is mine!",
    "helloooooooooo 👀",
    "enjoy your stay :3",
    "made with love <3",
    "bongos binted?",
    "ken carson fan",
    "[>::<]"
  ];

  const subtitle = document.getElementById("funnything");
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  if (subtitle) subtitle.textContent = randomPhrase;
});


// =========================
//  my time
// =========================

function updateTime() {
  const now = new Date();
  const hours = (now.getUTCHours() + 5) % 24;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  document.getElementById("time-text").textContent =
    `My time: ${hours.toString().padStart(2, "0")}:${minutes}:${seconds} [GMT+5]`;

  const moon = document.getElementById("moon");
  const isSleep = hours >= 23 || hours < 6;

  if (isSleep) {
    moon.textContent = " 🌙";

    if (!bootstrap.Popover.getInstance(moon)) {
      new bootstrap.Popover(moon, {
        trigger: "hover",
        placement: "top"
      });
    }
  } else {
    moon.textContent = "";
    const inst = bootstrap.Popover.getInstance(moon);
    if (inst) inst.dispose();
  }
}

updateTime();
setInterval(updateTime, 1000);


// =========================
//  сlick-to-copy
// =========================

function copyToClipboard(button, text) {
  navigator.clipboard.writeText(text).then(() => {
    let popover = bootstrap.Popover.getInstance(button);
    if (!popover) popover = new bootstrap.Popover(button);
    popover.show();
    setTimeout(() => popover.hide(), 1000);
  });
}

function copyDiscord(button) {
  copyToClipboard(button, "er1k0v");
}

function copyEpicGames(button) {
  copyToClipboard(button, "erkv1337");
}


document.addEventListener("DOMContentLoaded", function () {
  const popoverTrigger = document.querySelector("[data-bs-toggle='popover']");
  if (popoverTrigger) new bootstrap.Popover(popoverTrigger);
});

