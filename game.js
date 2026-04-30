console.log("RENDER TEST 123");
# vagy bármilyen editor
# majd mentsd el!const socket = io("https://spaceinvansion-p1tl.onrender.com", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity
});

const c = document.getElementById("game");
const ctx = c.getContext("2d");

const mini = document.getElementById("minimap");
const mctx = mini.getContext("2d");

let mySector = 1;
let players = {};
let bullets = [];

let player = { x: 500, y: 500, angle: 0, hp: 100 };
let input = { x: 0, y: 0 };

/* SOCKET */
socket.on("joined", s => mySector = s);

socket.on("state", d => {
    players = d.sectors?.[mySector] || {};
    bullets = d.bullets || [];
});

/* START */
function startMulti(){
    document.getElementById("menu").style.display="none";
    socket.emit("joinSector",1);
}

/* MOVE */
function update(){
    player.x += input.x * 6;
    player.y += input.y * 6;
    socket.emit("move", player);
}

/* DRAW */
function draw(){
    ctx.clearRect(0,0,900,600);

    for(let id in players){
        let p=players[id];

        ctx.beginPath();
        ctx.arc(p.x,p.y,20,0,Math.PI*2);
        ctx.fillStyle="cyan";
        ctx.fill();
    }

    bullets.forEach(b=>{
        if(b.sector!==mySector) return;
        ctx.fillRect(b.x,b.y,5,5);
    });
}

/* MINIMAP */
function drawMini(){
    mctx.clearRect(0,0,180,180);

    for(let id in players){
        let p=players[id];
        let x=(p.x/900)*180;
        let y=(p.y/600)*180;

        mctx.fillRect(x,y,3,3);
    }
}

/* LOOP */
function loop(){
    update();
    draw();
    drawMini();
    requestAnimationFrame(loop);
}
loop();00, 4, 4);
}

loop();
