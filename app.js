// app.js
const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('./conexion');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Ruta para recibir datos del formulario
app.post('/ingresar', (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
  conexion.query(sql, [nombre, correo, contrasena], (error, resultado) => {
    if (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).send('Error al registrar los datos');
    } else {
      console.log('Usuario registrado:', resultado);
      res.send('Datos guardados correctamente');
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});