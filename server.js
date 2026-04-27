const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static("public"));

let players = {};
let drones = [];
let lasers = [];

let replayBuffer = [];
const MAX_BUFFER = 200;

function snapshot(){
    replayBuffer.push({
        players: structuredClone(players),
        drones: structuredClone(drones),
        lasers: structuredClone(lasers)
    });

    if(replayBuffer.length > MAX_BUFFER)
        replayBuffer.shift();
}

io.on("connection",(socket)=>{

    players[socket.id] = {
        x:400,
        y:300,
        angle:0,
        shield:100,
        team: Math.random() > 0.5 ? "red" : "blue"
    };

    socket.on("move",(d)=>{
        let p = players[socket.id];
        if(!p) return;

        p.x = d.x;
        p.y = d.y;
        p.angle = d.angle;
    });

    socket.on("shoot",()=>{
        let p = players[socket.id];
        if(!p) return;

        lasers.push({
            x:p.x,
            y:p.y,
            vx:Math.cos(p.angle)*10,
            vy:Math.sin(p.angle)*10,
            owner:socket.id
        });
    });

    socket.on("disconnect",()=>{
        delete players[socket.id];
    });
});

function damagePlayer(id, attacker){
    let p = players[id];
    if(!p) return;

    p.shield -= 20;

    if(p.shield <= 0){

        io.to(id).emit("killcam",{
            killer: attacker,
            buffer: replayBuffer
        });

        p.shield = 100;
        p.x = 400;
        p.y = 300;
    }
}

setInterval(()=>{

    snapshot();

    lasers.forEach((l,i)=>{

        l.x += l.vx;
        l.y += l.vy;

        for(let id in players){
            let p = players[id];

            if(Math.hypot(l.x-p.x,l.y-p.y) < 20){
                damagePlayer(id, l.owner);
                lasers.splice(i,1);
                break;
            }
        }
    });

    io.emit("state",{players,drones,lasers});

},30);

server.listen(4000,()=>{
    console.log("🚀 SERVER RUNNING ON PORT 4000");
});
