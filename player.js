const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const fullBtn = document.getElementById("full");
const fill = document.getElementById("fill");
const time = document.getElementById("time");
const seek = document.getElementById("seek");

function format(t) {
    if (!t || isNaN(t)) return "00:00";
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function updateUI() {
    if (!video.duration) return;
    fill.style.width = (video.currentTime / video.duration) * 100 + "%";
    time.textContent = `${format(video.currentTime)} / ${format(video.duration)}`;
}

playBtn.onclick = () => {
    if (video.paused) {
        video.play();
        playBtn.textContent = "❚❚";
    } else {
        video.pause();
        playBtn.textContent = "▶";
    }
};

video.ontimeupdate = updateUI;
video.onloadedmetadata = updateUI;

seek.onclick = (e) => {
    if (!video.duration) return;
    const rect = seek.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
};

muteBtn.onclick = () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
};

fullBtn.onclick = () => {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
};