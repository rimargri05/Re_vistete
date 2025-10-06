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