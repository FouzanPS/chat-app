import express from 'express';
const app = express();
import { Server } from 'socket.io';
import { createServer } from 'http';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = createServer(app);
const io = new Server(server);
const port = 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	socket.on('send name', (username) => {
		io.emit('send name', (username));
	});

	socket.on('send message', (chat) => {
		io.emit('send message', (chat));
	});
});

server.listen(port, () => {
	console.log(`Server is listening at the port: ${port}`);
});
