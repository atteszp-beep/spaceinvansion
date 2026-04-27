const socket = io("http://localhost:30001");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const radar = document.getElementById("radar");
const rctx = radar.getContext("2d");

let players = {};
let lasers = {};
let drones = {};

let myId;

/* ================= IMAGES ================= */
const imgP = new Image(); imgP.src = "img/spaceship.png";
const imgA = new Image(); imgA.src = "img/alien.png";
const imgB = new Image(); imgB.src = "img/bullet.png";

/* ================= CONNECT ================= */
socket.on("connect",()=>{
myId = socket.id;
});

/* ================= STATE ================= */
socket.on("state",(data)=>{
players = data.players;
lasers = data.lasers;
drones = data.drones;
});

/* ================= INPUT ================= */
document.addEventListener("keydown",(e)=>{
if(e.key===" ") socket.emit("shoot");
});

/* ================= JOYSTICK ================= */
let joy = {x:0,y:0,active:false};

const base = document.getElementById("joystickBase");
const stick = document.getElementById("joystickStick");

base.addEventListener("mousedown",()=>joy.active=true);

document.addEventListener("mouseup",()=>{
joy.active=false;
joy.x=0; joy.y=0;
stick.style.transform="translate(0,0)";
});

document.addEventListener("mousemove",(e)=>{
if(!joy.active) return;

let r = base.getBoundingClientRect();

let x = e.clientX - r.left - 60;
let y = e.clientY - r.top - 60;

let len = Math.hypot(x,y);
if(len>50){ x/=len; y/=len; x*=50; y*=50; }

joy.x = x/50;
joy.y = y/50;

stick.style.transform=`translate(${x}px,${y}px)`;
});

/* ================= UPDATE ================= */
function update(){

let me = players[myId];
if(!me) return;

me.x += joy.x * 5;
me.y += joy.y * 5;

me.angle = Math.atan2(joy.y,joy.x);

socket.emit("move",me);
}

/* ================= DRAW ================= */
function draw(){

ctx.fillStyle="black";
ctx.fillRect(0,0,900,600);

/* LASERS */
for(let i in lasers){
let l = lasers[i];
ctx.fillStyle="cyan";
ctx.fillRect(l.x,l.y,4,4);
}

/* DRONES */
for(let i in drones){
let d = drones[i];
ctx.drawImage(imgA,d.x,d.y,20,20);
}

/* PLAYERS */
for(let id in players){
let p = players[id];

ctx.save();
ctx.translate(p.x,p.y);
ctx.rotate(p.angle||0);
ctx.drawImage(imgP,-16,-16,32,32);
ctx.restore();
}

}

/* ================= RADAR ================= */
function radarDraw(){

rctx.fillStyle="black";
rctx.fillRect(0,0,200,200);

let me = players[myId];
if(!me) return;

for(let id in players){
let p = players[id];

rctx.fillStyle="lime";
rctx.fillRect((p.x-me.x)*0.1+100,(p.y-me.y)*0.1+100,3,3);
}

}

/* ================= LOOP ================= */
function loop(){
update();
draw();
radarDraw();
requestAnimationFrame(loop);
}

loop();
