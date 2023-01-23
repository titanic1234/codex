/*const http = require("http");

const port = 3333;

const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {

    response.statusCode = 200;
    response.setHeader("Content-Type", "www/index.html")

    response.end("www/index.html")
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname.toString()}:${port.toString()}/`)
})
*/


// Laden des http-Moduls
const http = require('http');
const fs = require('fs');



module.exports = {
    name: "website",
    description: "Start Website",
    async execute(client) {
        try {


            // Erstellen des Web-Servers
            const webServer = http.createServer((request, response) => {
                // Bearbeiten der Anfrage vom Backend-Server
                // ...
                console.log("Request");
                // Senden einer Antwort an den Backend-Server
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end("Codex");
            });

            // Starten des Web-Servers auf dem Port 3000
            webServer.listen(3000, () => {
                console.log('Web-Server läuft auf Port 3000');
            });


        } catch (err) {
            console.log("Ein Error ist bei der Website aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
            await client.website.get("website").execute(client);
        }
    }
}