const username = "er1kv";
const apiKey = "6a807c3ca61e71d343a89a9dd55a978b";

async function fetchNowPlaying() {
  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
    const data = await res.json();
    const track = data.recenttracks.track[0];
    const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
    if (track && isNowPlaying) {
      document.getElementById("trackTitle").textContent = track.name;
      document.getElementById("artistName").textContent = track.artist['#text'];
      document.getElementById("albumArt").src = track.image[3]['#text'] || "default.jpg";
    }
  } catch (err) {
    console.error("Ошибка загрузки трека:", err);
  }
}
fetchNowPlaying();
setInterval(fetchNowPlaying, 15000);

async function updateTime() {
  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/GMT-5", { cache: "no-store" });
    const data = await res.json();
    const date = new Date(data.utc_datetime);
    date.setUTCHours(date.getUTCHours() + 5);

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    const timeText = `My time: ${hours}:${minutes}:${seconds} (GMT+5)`;
    document.getElementById("time-text").textContent = timeText;

    const showMoon = Number(hours) >= 23 || Number(hours) < 6;
    const moonSpan = document.getElementById("moon");

    if (showMoon) {
      moonSpan.textContent = " 🌙";
      if (!bootstrap.Popover.getInstance(moonSpan)) {
        new bootstrap.Popover(moonSpan, { trigger: 'hover', placement: 'top' });
      }
    } else {
      moonSpan.textContent = "";
      const existing = bootstrap.Popover.getInstance(moonSpan);
      if (existing) existing.dispose();
    }
  } catch (e) {
    console.error("Ошибка получения времени:", e);
  }
}

setInterval(updateTime, 1000);
updateTime();

function copyToClipboard(button, text) {
  navigator.clipboard.writeText(text).then(() => {
    let popover = bootstrap.Popover.getInstance(button);
    if (!popover) {
      popover = new bootstrap.Popover(button);
    }
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
  const popoverTrigger = document.querySelector('[data-bs-toggle="popover"]');
  if (popoverTrigger) {
    new bootstrap.Popover(popoverTrigger);
  }

});



