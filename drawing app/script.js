const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let isErasing = false;
let isDrawingStraightLine = false;
let startPoint = { x: 0, y: 0 };
let x, y;

let size = 10;
let color = 'black';

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
    ctx.lineWidth = size * 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? 'white' : color;
    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    x = e.offsetX;
    y = e.offsetY;

    if (!isErasing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.strokeStyle = 'white'; // Set the stroke color to white for erasing
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = color; // Reset the stroke color to the drawing color
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();

    if (isDrawingStraightLine) {
        isDrawingStraightLine = false;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

canvas.addEventListener('click', (e) => {
    if (isDrawingStraightLine) {
        isDrawingStraightLine = false;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('increase').addEventListener('click', () => {
    size += 5;
    document.getElementById('size').innerText = size;
});

document.getElementById('decrease').addEventListener('click', () => {
    size = Math.max(5, size - 5);
    document.getElementById('size').innerText = size;
});

document.getElementById('color').addEventListener('input', (e) => {
    color = e.target.value;
    ctx.strokeStyle = isErasing ? 'white' : color;
});

document.getElementById('eraser').addEventListener('click', () => {
    isErasing = !isErasing;
    document.getElementById('eraser').classList.toggle('active', isErasing);
    ctx.strokeStyle = isErasing ? 'white' : color;
});

document.getElementById('straight-line').addEventListener('click', () => {
    isDrawingStraightLine = true;
});

canvas.addEventListener('mousedown', (e) => {
    if (isDrawingStraightLine) {
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
        x = e.offsetX;
        y = e.offsetY;
    }
});
