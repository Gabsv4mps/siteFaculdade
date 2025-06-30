const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

const FolhaController = require("./rotas.js")
new FolhaController(app);
const port = 3000;



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});