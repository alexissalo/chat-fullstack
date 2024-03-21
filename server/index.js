import express from "express";
import http from "http";
import morgan from "morgan";
import db from "./db.js";
import { Server as SocketServer } from "socket.io";
import { resolve, dirname } from "path";
import usuarioRoutes from "./routes/usuario.routes.js"
import { PORT } from "./config.js";
import cors from "cors";
import bodyParser from 'body-parser'

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

//Routes

app.use(usuarioRoutes)

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve("frontend/dist")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message, nickname) => {
    socket.broadcast.emit("message", {
      mensaje:message,
      from: socket.id.slice(8),
    });
  });
});

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
  db();
});
