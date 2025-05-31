const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;
ctx.translate(radius, radius);

function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

  // Neon white ring border
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 20;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // Draw center text (e.g., your name or label)
ctx.fillStyle = "gray";               // Text color
ctx.font = "bold 22px 'Orbitron', 'Audiowide', 'Share Tech Mono', 'Consolas', monospace"; // Futuristic font stack
ctx.textAlign = "center";              // Center horizontally
ctx.textBaseline = "middle";           // Center vertically
ctx.fillText("#75DayChallengeIIT", 0, 0);         // Draw at the origin


  drawTicks(); // draw 4 ticks

  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // Draw digital time first (so hands overlay it)
  drawDigitalTime(now.getHours(), now.getMinutes());

  // Hour hand
  const hourAngle = (hour % 12) * Math.PI / 6 + minute * Math.PI / (6 * 60);
  drawHand(hourAngle, radius * 0.5, 7, "white");

  // Minute hand
  const minuteAngle = minute * Math.PI / 30 + second * Math.PI / (30 * 60);
  drawHand(minuteAngle, radius * 0.75, 5, "white");

  // Second hand
  const secondAngle = second * Math.PI / 30;
  drawHand(secondAngle, radius * 0.9, 2, "white");
}

function drawHand(pos, length, width, color = "white") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawTicks() {
  const angles = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]; // 12, 3, 6, 9
  angles.forEach(angle => {
    const startX = radius * 0.85 * Math.cos(angle);
    const startY = radius * 0.95 * Math.sin(angle);
    const endX = radius * 0.95 * Math.cos(angle);
    const endY = radius * 0.85 * Math.sin(angle);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "white";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 15;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  });
}

function drawDigitalTime(hour, minute) {
  const hourText = String(hour).padStart(2, '0');
  const minuteText = String(minute).padStart(2, '0');

  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw Hours - top half
  ctx.font = "bold 60px monospace";
  ctx.fillText(hourText, 0, -radius * 0.4);

  // Draw Minutes - bottom half
  ctx.font = "bold 60px monospace";
  ctx.fillText(minuteText, 0, radius * 0.4);
}

setInterval(drawClock, 1000);

// Picture-in-Picture
const pipButton = document.getElementById("pipButton");
const stream = canvas.captureStream(30); // 30fps
const video = document.createElement("video");
video.srcObject = stream;
video.muted = true;
video.play();

pipButton.addEventListener("click", async () => {
  try {
    await video.requestPictureInPicture();
  } catch (err) {
    alert("Your browser doesn't support Picture-in-Picture.");
  }
});
