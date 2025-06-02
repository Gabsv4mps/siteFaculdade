const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

const FolhaController = require("./rotas.js")
new FolhaController(app);
const port = 3000;



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});