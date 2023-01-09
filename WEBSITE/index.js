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

fs.readFile("www/index.html", "utf8", async function (err, data) {
    if (err) {
        console.log(err);
    }


    const html_content = data.toString()
    //console.log(html_content)


    // Erstellen des Web-Servers
    const webServer = http.createServer((request, response) => {
        // Bearbeiten der Anfrage vom Backend-Server
        // ...
        console.log("Request");
        // Senden einer Antwort an den Backend-Server
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html_content.toString());
    });

    // Starten des Web-Servers auf dem Port 3000
    webServer.listen(3000, () => {
        console.log('Web-Server läuft auf Port 3000');
    });

    // Erstellen des Backend-Servers
    const backendServer = http.createServer((request, response) => {
        // Bearbeiten der Anfrage vom Web-Server
        // ...

        // Senden einer Antwort an den Web-Server
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Backend\n');
    });

    // Starten des Backend-Servers auf dem Port 3001
    backendServer.listen(3001, () => {
        console.log('Backend-Server läuft auf Port 3001');
    });


});