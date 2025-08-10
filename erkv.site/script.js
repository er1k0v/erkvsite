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

function updateTime() {
  const now = new Date();
  const utcTimestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
  const gmt5 = new Date(utcTimestamp + 5 * 60 * 60 * 1000);

  let hours = gmt5.getUTCHours();
  let minutes = gmt5.getUTCMinutes();
  let seconds = gmt5.getUTCSeconds();

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  const timeText = `My time: ${hours}:${minutes}:${seconds} (GMT+5)`;
  document.getElementById("time-text").textContent = timeText;

  const showMoon = Number(hours) >= 23 || Number(hours) < 6;
  const moonSpan = document.getElementById("moon");

  if (showMoon) {
    moonSpan.textContent = " 🌙";
    if (!bootstrap.Popover.getInstance(moonSpan)) {
      new bootstrap.Popover(moonSpan, {
        trigger: 'hover',
        placement: 'top'
      });
    }
  } else {
    moonSpan.textContent = "";
    const existing = bootstrap.Popover.getInstance(moonSpan);
    if (existing) existing.dispose();
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


