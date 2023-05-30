import resample_single from "./resizeCanvas.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSmall = document.getElementById("canvasSmall");
const ctx2 = canvasSmall.getContext("2d");
const btnCleanCanvas = document.getElementById("btnCleanCanvas");
const btnIdentifyImg = document.getElementById("btnIdentifyImg");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const CANVAS_COLOR = "#fff";

const CLASS_NAMES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "_A",
  "_B",
  "_C",
  "_D",
  "_E",
  "_F",
  "_G",
  "_H",
  "_I",
  "_J",
  "_K",
  "_L",
  "_M",
  "_N",
  "_O",
  "_P",
  "_Q",
  "_R",
  "_S",
  "_T",
  "_U",
  "_V",
  "_W",
  "_X",
  "_Y",
  "_Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let initialX;
let initialY;

ctx.fillStyle = CANVAS_COLOR;
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

class L2 {
  static className = "L2";

  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2);

let modelo;
(async () => {
  console.log("Cargando modelo...");
  modelo = await tf.loadLayersModel("./iaModel/model.json");
  console.log("Modelo cargado...");
})();

const dibujar = (cursorX, cursorY) => {
  ctx.beginPath();
  ctx.moveTo(initialX, initialY);
  ctx.lineWidth = 10;
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

const downloadCanvas = (e) => {
  e.preventDefault();
  resample_single(canvas, 128, 128, canvasSmall);
  const link = document.createElement("a");
  link.href = canvasSmall.toDataURL(); // Obtener la imagen en formato base64 desde el canvas
  link.download = "canvas_image.jpg"; // Nombre del archivo de descarga
  link.click();
};

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
btnCleanCanvas.addEventListener("click", cleanCanvas);
btnIdentifyImg.addEventListener("click", downloadCanvas);
