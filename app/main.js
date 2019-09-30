const {app, BrowserWindow, ipcMain} = require('electron'); //solo puede existir un ipcMain que se comunica con los demas ipc
const path = require('path');
const url = require('url');

//configuracion de knex, la "conexion" es la direccion del archivo en el filesystem 
const knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: path.join(__dirname, 'mydb.sdb')
	},
	useNullAsDefault: true  //sqlite no tiene null por default, esta linea se lo agrega
});

let mainWindow = null; //genera la pantalla en el contexto global para siempre poder acceder 

app.on('ready', () => { //evento ready se da cuando carga la aplicacion carga
    console.log('hello from electron'); //a la consola 
    mainWindow = new BrowserWindow({
        webPreferences: {       // ¡¡¡¡ ULTRA NECESARIO PARA USAR NODEjs !!!!
            nodeIntegration: true   
          }
    });
    mainWindow.webContents.loadFile('./app/index.html'); //carga el html
});

//ESPERA AL EVENTO 'autor:valor' ,  se comunica con el proceso ipc renderer, los valores del form
ipcMain.on('autor:valor', function (e, autor) { //para prueba usar valor 'Juan' y no autor
    let result = knex('AUTOR').where('nombre_autor', 'Juan').select('paterno_autor');    //construye el query con knex
    console.log(autor); 
    result.then(function (rows) {
        mainWindow.webContents.send("resultSent", rows);    //envia el evento "resultSent" al "cliente" con el resultado del query
    });
});
