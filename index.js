const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let almacen = require("./almacen")

app.get("/almacen", function(req, res) {
    res.send(almacen)
})

app.get("/almacen/:seccion", function(req, res) {
    let seccion = req.params.seccion;
    seccion = seccion.toLowerCase();
    let boolean = false;

    if (seccion == "armarios") {
        res.send(almacen.armarios)
        boolean = true;
    } else if (seccion == "mesas") {
        res.send(almacen.mesas)
        boolean = true;
    } else if (seccion == "sillas") {
        res.send(almacen.sillas)
        boolean = true;
    }

    if (boolean == false) {
        res.send({ error: true, mensaje: "No disponemos de esa seccion" })
    }

})

app.listen(3000);