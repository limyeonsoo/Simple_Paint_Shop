const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const ctx = canvas.getContext('2d');
const mode = document.getElementById("jsMode");
const saveBTN = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
ctx.strokeStyle = "#2c2cec";   //variable
ctx.lineWidth = 2.5;           //variable
ctx.fillStyle = "#2c2cec";

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){       //change to startpoint.
        ctx.beginPath();
        ctx.moveTo(x,y)
    } 
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    //painting = true;
    startPainting();
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function changeRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function changeMode(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        //mode.innerText = "Paint";  need to skill that fill color into the area.
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect()

    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    console.log(event);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintYS"
    link.click();
    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", changeRange);
}
if(mode){
    mode.addEventListener("click", changeMode);
}
if(saveBTN){
    saveBTN.addEventListener("click", handleSaveClick);
}