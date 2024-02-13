
//Actividad 1
//Josue Bonilla Cardenas - #22110106
//12/02/2024
//5P

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
    {id: 1, nombre: 'josh'},
    {id: 2, nombre: 'Ivan'},
    {id: 3, nombre: 'Yaza'},
];

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.post('/user', (req, res) => {
    const nuevoUser = req.body;
    usuarios.push(nuevoUser);
    res.send(usuarios);
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const usuarioEliminado = usuarios.find(usuario => usuario.id === parseInt(id));
  if (!usuarioEliminado) {
    res.status(404).send("Usuario no encontrado.");
  } else {
    usuarios = usuarios.filter(usuario => usuario.id !== parseInt(id));
    res.send(`Usuario con ID ${id} eliminado correctamente.`);
  }
});

app.patch('/patch/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const usuario = usuarios.find(usuario => usuario.id === parseInt(id));
  if (!usuario) {
    res.status(404).send("Usuario no encontrado.");
  } else {
    usuario.nombre = nombre || usuario.nombre;
    res.send(`Usuario con ID ${id} actualizado correctamente.`);
  }
});

app.get('/find/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(usuario => usuario.id === parseInt(id));
  if (!usuario) {
    res.status(404).send("Usuario no encontrado.");
  } else {
    res.json(usuario);
  }
});

app.get('/user', (req, res) => {
    res.json(usuarios);
});

app.get('/buscar', (req, res) => {
    const searchTerm = req.query.termino;
    res.send(`Resultados de búsqueda para: ${searchTerm}`);
});

app.listen(PORT, () => {
  console.log("Servidor Express en funcionamiento en http://localhost:3000");
});

console.log("Hola mundo")