const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INIT_COLOR = "black"
const CAVAS_SIZE = 700

canvas.width = CAVAS_SIZE;
canvas.height = CAVAS_SIZE;

ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = range.value;

let painting = false;
let filling = false;

function handleRangeChange(event){
	const currentValue = event.target.value;
	ctx.lineWidth = currentValue;
}

function handleColorClick(event){
	const selectedColor = event.target.style.backgroundColor;
	ctx.strokeStyle = selectedColor;
	ctx.fillStyle = selectedColor;
}

function handleModeClick(){
	if (filling === true){
		filling = false;
		mode.innerText = 'Fill'
	} else {
		filling = true;
		mode.innerText = 'Draw'
	}
}

function stopPainting() {
	painting = false;
}

function startPainting(){
	painting = true;
}

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;
	if(filling === false){
		if(painting == false){
			ctx.beginPath();
			ctx.moveTo(x, y);
		} else{
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
}

function handleCM(event){
	event.preventDefault();
}

function hadnleSaveClick(){
	const image = canvas.toDataURL(`image/png`);
	const link = document.createElement("a");
	link.href = image;
	link.download = "paint.png";
	link.click();
}

function handleCanvasClick(){
	if(filling){
		ctx.fillRect(0, 0, CAVAS_SIZE, CAVAS_SIZE);
	}
}

function init(){
	if(canvas){
		canvas.addEventListener("mousemove", onMouseMove);
		canvas.addEventListener("mousedown", startPainting);
		canvas.addEventListener("mouseup", stopPainting);
		canvas.addEventListener("mouseleave", stopPainting);
		canvas.addEventListener("click", handleCanvasClick);
		canvas.addEventListener("contextmenu", handleCM);
	}
	if(range){
		range.addEventListener("input", handleRangeChange);
	   }
	if(colors){
		Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
	}
	if(mode){
		mode.addEventListener("click", handleModeClick);
	}
	if(save){
		save.addEventListener("click", hadnleSaveClick);
	}
}

init();
