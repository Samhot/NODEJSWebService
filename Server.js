"use strict";

var http = require('http');
var cors = require('cors');
var socketio = require('socket.io');
var express = require('express');
var app = express();
// TODO NE PAS CHANGER LE PORT 3005 est utilisé sur le reverse proxy en PROD
var port = 3001;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization");
    next();
});
var server = require('http').createServer(app);
var io = socketio.listen(server, {log:false, origins:'*'});

server.listen(port);
console.log("listening on port : " + port);


app.options('*', cors());


/*
 io.origins('*:*');
 */
io.set('origins', '*:*');
io.sockets.on('connection', function(socket){
    socket.on('connect', function(data){
        console.log("test");
    });

    socket.on('envoiCartesServ', function (cartes) {
        console.log("envoi cartes au serveur python");
        io.sockets.emit('envoiCartesIA', cartes);
    })

    socket.on('responseCarteServ', function (cartes) {
        console.log("cartes reçues du serveur python");
        io.sockets.emit('envoiCartesFront', cartes);
    })
});

