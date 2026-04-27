const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
    transports: ["websocket"]
});

/* ===== STATIC ===== */
app.use(express.static("public"));

/* ===== HEALTH CHECK ===== */
app.get("/", (req, res) => {
    res.send("🚀 SCIFI MULTIPLAYER SERVER LIVE");
});

/* ===== CONFIG ===== */
const MAX_PER_SECTOR = 6;
const SECTOR_COUNT = 5;

/* ===== GAME STATE ===== */
let sectors = {};
let bullets = [];

/* init sectors */
for (let i = 1; i <= SECTOR_COUNT; i++) {
    sectors[i] = {};
}

/* ===== HELPERS ===== */

function canJoin(sector) {
    return Object.keys(sectors[sector]).length < MAX_PER_SECTOR;
}

function spawn(id, sector) {
    sectors[sector][id] = {
        x: 400 + Math.random() * 300,
        y: 300 + Math.random() * 300,
        angle: 0,
        hp: 100,
        dead: false,
        sector
    };
}

/* ===== SOCKET ===== */

io.on("connection", (socket) => {

    console.log("🟢 CONNECT:", socket.id);

    /* JOIN SECTOR */
    socket.on("joinSector", (sector) => {

        if (!sectors[sector]) sector = 1;

        if (!canJoin(sector)) {
            socket.emit("sectorFull");
            return;
        }

        socket.sector = sector;
        spawn(socket.id, sector);

        socket.emit("joined", sector);
        io.emit("state", { sectors, bullets });
    });

    /* MOVE */
    socket.on("move", (data) => {
        let s = socket.sector;
        if (!s) return;

        let p = sectors[s][socket.id];
        if (!p || p.dead) return;

        p.x = data.x;
        p.y = data.y;
        p.angle = data.angle;
    });

    /* SHOOT */
    socket.on("shoot", (data) => {
        let s = socket.sector;
        if (!s) return;

        bullets.push({
            x: data.x,
            y: data.y,
            vx: Math.cos(data.angle) * 10,
            vy: Math.sin(data.angle) * 10,
            owner: socket.id,
            sector: s
        });
    });

    /* DISCONNECT */
    socket.on("disconnect", () => {
        let s = socket.sector;
        if (s && sectors[s]) {
            delete sectors[s][socket.id];
        }
        console.log("🔴 DISCONNECT:", socket.id);
    });
});

/* ===== GAME LOOP ===== */

setInterval(() => {

    bullets.forEach((b) => {

        b.x += b.vx;
        b.y += b.vy;

        let sec = sectors[b.sector];
        if (!sec) return;

        for (let id in sec) {
            let p = sec[id];

            if (p.dead) continue;
            if (id === b.owner) continue;

            let dx = p.x - b.x;
            let dy = p.y - b.y;

            if (Math.hypot(dx, dy) < 25) {
                p.hp -= 25;
                b.dead = true;

                if (p.hp <= 0) {
                    p.dead = true;

                    setTimeout(() => {
                        p.hp = 100;
                        p.dead = false;
                        p.x = 400 + Math.random() * 200;
                        p.y = 300 + Math.random() * 200;
                    }, 3000);
                }
            }
        }
    });

    bullets = bullets.filter(b => !b.dead);

    io.emit("state", { sectors, bullets });

}, 1000 / 30);

/* ===== SERVER START ===== */

const PORT = process.env.PORT || 4000;

server.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 SERVER RUNNING ON PORT", PORT);
});
