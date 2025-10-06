let mysql = require("mysql2");





let conexion = mysql.createConnection({

    host: "localhost",

    database: "revistete",

    user: "root",

    password: ""

});



conexion.connect(function(err){

    if(err){

       throw err;

    }else{

       console.log("conexion exitosa");

}

});

const ingresar = 'SELECT * FROM ingresar'; // 👈 cambia por tu tabla real

conexion.query(ingresar, function(error, lista) {
  if (error) {
    console.error('Error en la consulta:', error);
    return;
  }
  console.log('✅ Resultados de la consulta:');
  console.log(lista.length);//para saber la cantidad de regristros se usa length
  
});

// Cerrar conexión (opcional)
conexion.end();