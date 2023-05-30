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

// const downloadCanvas = (e) => {
//   e.preventDefault();
//   const link = document.createElement("a");
//   link.href = canvas.toDataURL(); // Obtener la imagen en formato base64 desde el canvas
//   link.download = "canvas_image.jpg"; // Nombre del archivo de descarga
//   link.click();
// };

const downloadCanvas = async () => {
  // const img = document.createElement("img");
  // img.src = canvas.toDataURL(); // Obtener la imagen en formato base64 desde el canvas

  // document.body.appendChild(img);
  resample_single(canvas, 128, 128, canvasSmall);

  // const link = document.createElement("a");
  // link.href = canvasSmall.toDataURL(); // Obtener la imagen en formato base64 desde el canvas
  // link.download = "canvas_image.jpg"; // Nombre del archivo de descarga
  // link.click();

  // let imgData = ctx2.getImageData(0, 0, 128, 128);
  // const pixelData = imgData.data;

  // console.log(pixelData);
  // const tensor = tf.tensor3d(pixelData, [128, 128, 1], "int32");
  // const prediction = await modelo.predict(tensor);
  // const result = prediction.dataSync();

  // console.log("Prediccion: ", result);

  var imgData = ctx2.getImageData(0, 0, 128, 128);
  var arr = [];
  var arr128 = [];

  for (var p = 0, i = 0; p < imgData.data.length; p += 4) {
    var r = imgData.data[p];
    var g = imgData.data[p + 1];
    var b = imgData.data[p + 2];

    var valor = [r / 255, g / 255, b / 255]; // Normalizar los valores de 0-255 a 0-1

    arr128.push(valor);

    if (arr128.length == 128) {
      arr.push(arr128);
      arr128 = [];
    }
  }

  arr = [arr];

  var tensor4 = tf.tensor4d(arr);
  var resultados = modelo.predict(tensor4).dataSync();
  var mayorIndice = resultados.indexOf(Math.max.apply(null, resultados));

  console.log(resultados);
  console.log("Predicción:", mayorIndice);
};

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
btnCleanCanvas.addEventListener("click", cleanCanvas);
btnIdentifyImg.addEventListener("click", downloadCanvas);
