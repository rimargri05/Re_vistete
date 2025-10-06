const express = require("express");
const mysql= require("mysql2/promise");
const bcrypt= require("bcrypt");

const app= express();
app.use(express.json())



//conexion a la base de datos
let mysql = require("mysql2");
let conexion = mysql.createConnection({
    host: "localhost",
    database: "revistete",
    user: "root",
    password: ""

});

//solo de prueba//
conexion.connect(function(err){
      if(err){
      throw err;
      }else{
      console.log("conexion exitosa");
    }
});

