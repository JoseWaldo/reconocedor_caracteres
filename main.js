const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnCleanCanvas = document.getElementById("btnCleanCanvas");
const btnIdentifyImg = document.getElementById("btnIdentifyImg");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const CANVAS_COLOR = "#00ff00";

let initialX;
let initialY;

ctx.fillStyle = CANVAS_COLOR;
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

const dibujar = (cursorX, cursorY) => {
  ctx.beginPath();
  ctx.moveTo(initialX, initialY);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineTo(cursorX, cursorY);
  ctx.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseMoving = (e) => {
  dibujar(e.offsetX, e.offsetY);
};

const mouseDown = (e) => {
  initialX = e.offsetX;
  initialY = e.offsetY;
  dibujar(initialX, initialY);
  canvas.addEventListener("mousemove", mouseMoving);
};

const mouseUp = (e) => {
  canvas.removeEventListener("mousemove", mouseMoving);
};

const cleanCanvas = (e) => {
  e.preventDefault();
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = CANVAS_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

// const downloadCanvas = (e) => {
//   e.preventDefault();
//   const link = document.createElement("a");
//   link.href = canvas.toDataURL(); // Obtener la imagen en formato base64 desde el canvas
//   link.download = "canvas_image.jpg"; // Nombre del archivo de descarga
//   link.click();
// };

const downloadCanvas = () => {
  const img = document.createElement("img");
  img.src = canvas.toDataURL(); // Obtener la imagen en formato base64 desde el canvas

  document.body.appendChild(img);
};

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
btnCleanCanvas.addEventListener("click", cleanCanvas);
btnIdentifyImg.addEventListener("click", downloadCanvas);
