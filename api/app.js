//jshint node: true, esversion: 6
'use strict';

const express = require("express");
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const socketio = require("socket.io");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());


// ===============>  SEEDING  <==================
// const fetch = require('./database/fetchSeeds');
// fetch();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const router = require('./routes/index');
app.use('/', router);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Express działa na porcie ${port}`);
});



const io = socketio.listen(server);
io.on("connect", socket => {
  console.log("Socket.io: połączono.");

  socket.on("test", () => {
    console.log("Test");
    io.sockets.emit("test");
  });

  // ------------ HORSE -----------------
  socket.on("update-horse", data => {
    socket.broadcast.emit("updateHorse", data);
  });

  socket.on("add-horse", data => {
    socket.broadcast.emit("addHorse", data);
  });

  socket.on("delete-horse", data => {
    socket.broadcast.emit("deleteHorse", data);
  });

  // ------------ CLASS -----------------
  socket.on("update-class", data => {
    socket.broadcast.emit("updateClass", data);
  });

  socket.on("add-class", data => {
    socket.broadcast.emit("addClass", data);
  });

  socket.on("delete-class", data => {
    socket.broadcast.emit("deleteClass", data);
  });

  // ------------ JUDGE -----------------
  socket.on("update-judge", data => {
    socket.broadcast.emit("updateJudge", data);
  });

  socket.on("add-judge", data => {
    socket.broadcast.emit("addJudge", data);
  });

  socket.on("delete-judge", data => {
    socket.broadcast.emit("deleteJudge", data);
  });


  socket.on("disconnect", () => {
    console.log("Socket.io: rozłączono.");
  });

  socket.on("error", err => {
    console.dir(err);
  });
});