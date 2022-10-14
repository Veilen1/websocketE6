let socket = io.connect() //se conecta al port 8080 cuando se ingresa a la pagina y emite un mensaje gracias al vinculo hecho en el html
socket.on("messages", function(data) {
    console.log(data);
    renderMSG(data); //renderiza toda la data
})

socket.on("products", function(data) {
    console.log(data);
    renderProduct(data)
})



function renderMSG(data) {
    let fecha = new Date
    let fechayhora = fecha.toLocaleString()
    let html = data.map(function(element, index) {
        return(`<div>
                <strong style="color:blue ;">${element.author}</strong><span style="color:red;">[${fechayhora}]</span>:
                <em style="color:green;">${element.text}</em>
                </div>`)
    }).join(" ");

    document.getElementById("messages").innerHTML = html //se crea el html y lo incerta en messages
}

function renderProduct(data) {
    let html = data.map(function(element, index) {
            return(`
                <div class="divProducts">
                <h2>Producto: ${element.nameProduct}</h2>
                <h4> Precio: ${element.price}</h4>
                <img src="${element.urlProduct}" alt="${element.nameProduct}.png">
                </div>`)
    }).join(" ");
    document.getElementById("products").innerHTML = html //se crea el html y lo incerta en messages
}

function addMessage() {
    let mensaje = {
        author: document.getElementById("email").value ,
        text: document.getElementById("texto").value
    };
    if(!(mensaje.text) || (mensaje.author.includes("@")) == ""){
        alert("Inserción de datos erroneos, cambie los datos ingresados y envia nuevamente")
    }else{
    socket.emit("new-message", mensaje); //new-message es el nombre del evento propuesto en el server.js
    document.getElementById("texto").value = ""
    document.getElementById("texto").focus()
    }
    return false
}
function addProduct() {
    let product = {
        nameProduct: document.getElementById("name").value,
        price: document.getElementById("price").value,
        urlProduct: document.getElementById("url").value
    };


    socket.emit("new-product", product); //new-message es el nombre del evento propuesto en el server.js
    document.getElementById("name").value = ""
    document.getElementById("price").value = ""
    document.getElementById("url").value = ""
    document.getElementById("name").focus()
    return false
}