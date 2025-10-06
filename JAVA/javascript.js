document.getElementById("btnIngresar").addEventListener("click", function() {
  window.location.href = "login.html";
});

// --- FORMULARIO DE INSCRIPCIÓN ---
document.addEventListener("DOMContentLoaded", function () {
  const btnForm = document.getElementById("btnFormulario");
  if (btnForm) {
    btnForm.addEventListener("click", function(e) {
      e.preventDefault();
      const nombre = document.getElementById("Nombre").value.trim();
      const celular = document.getElementById("Celular").value.trim();
      const edad = document.getElementById("Edad").value.trim();
      const ciudad = document.getElementById("Ciudad").value.trim();

      if (nombre === "" || celular === "" || edad === "" || ciudad === "") {
        alert("Por favor, completa todos los campos antes de enviar.");
        return;
      }

      fetch('/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nombre: nombre, Celular: celular, Edad: edad, Ciudad: ciudad })
      })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(err => alert('Error: ' + err));
    });
  }
});

//inhabilitado por causa de ejemplo
/*
const ingresar = 'SELECT * FROM ingresar'; //  tabla real

conexion.query(ingresar, function(error, lista) {
  if (error) {
    console.error('Error en la consulta:', error);
    return;
  }
  console.log('Resultados de la consulta:');
  console.log(lista.length);//para saber la cantidad de regristros se usa length
  
});

// Cerrar conexión (opcional)
conexion.end();
*/

// Registro de usuarios
app.post('/registro', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const query = 'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)';
    const [results] = await db.execute(query, [nombre, email, hashedPassword]);

    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Login de usuarios
app.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [results] = await db.execute(query, [email]);

    if (results.length === 0) {
      res.status(401).json({ message: 'Email o contraseña incorrecta' });
    } else {
      const isValidPassword = await bcrypt.compare(contraseña, results[0].contraseña);

      if (!isValidPassword) {
        res.status(401).json({ message: 'Email o contraseña incorrecta' });
 } else {
        res.json({ message: 'Usuario autenticado con éxito' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar usuario' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 8080');
});