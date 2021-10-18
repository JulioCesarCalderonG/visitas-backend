const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require("express-fileupload");
const http = require('http');
const socketIO = require('socket.io');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        this.authPath = '/api/auth';
        this.tachosPath = '/api/tachos';
        this.alertaPath = '/api/alertas';
        this.anuncioPath = '/api/anuncios';
        this.clientePath = '/api/clientes';
        this.pruebaPath = '/api/pruebas';
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors: {
                origin: true,
                credentials: true
              },            
          });
        //Conectar Base de datos
        this.conectarDB();
        //Socket
        this.escucharSockets();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    escucharSockets(){
        
        this.io.on('connection', cliente =>{});
    }
    middlewares(){
        this.app.use(
            fileUpload({
              useTempFiles: true,
              tempFileDir: "/tmp/",
              createParentPath: true,
            })
          );
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.tachosPath, require('../routes/tachos'));
        this.app.use(this.anuncioPath, require('../routes/anuncios'));
        this.app.use(this.clientePath, require('../routes/clientes'));
        this.app.use(this.pruebaPath, require('../routes/prueba'));
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;