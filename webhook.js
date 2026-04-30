const http = require("http");
const { exec } = require("child_process");

const SECRET = "mysecret123";

http.createServer((req, res) => {
    if (req.method === "POST") {
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", () => {

            console.log("📩 GitHub webhook érkezett");

            exec("bash deploy.sh", (err, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
            });

            res.end("OK");
        });
    }
}).listen(3000, () => {
    console.log("🚀 Webhook fut: port 3000");
});
