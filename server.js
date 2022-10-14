const express = require("express") 
const app = express() //app express
const server = require("http").Server(app) //requerimos http y le pasamos app, este pasa a ser nuestro server en vez de app
const io = require("socket.io")(server) //usamos el io en base al server. Y para hacer el server usamos "server" y no "app"

app.use(express.static("public"));

// all sockets y config
let messages = [];
let products = [];

io.on("connection", function(socket) {
    console.log("un cliente se ha conectado");
    socket.emit("messages", messages) // se le emiten todos los mensajes al cliente que ingresó
    socket.emit("products", products)

    socket.on("new-message", function(data) {
        messages.push(data); //agrega mensaje nuevo al array de msg
        io.sockets.emit("messages", messages) //emite el mensaje agregado y todos los anteriores a los usuarios conectados
    })

    socket.on("new-product", function(data) {
        products.push(data)
        io.sockets.emit("products", products)
    })
})

const PORT = process.env.PORT || 8080

const srv = server.listen(PORT, () => {
    console.log(`SERVIDOR HTTP CON WEBSOCKET ESCUCHANDO EL PUERTO ${srv.address().port}`);
})
srv.on("error", error => console.log(`Error en servidor: ${error}`))
