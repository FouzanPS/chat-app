let socket = io('http://localhost3000');

        let form = document.getElementById('form');
        let myname = document.getElementById('myname');
        let message = document.getElementById('message');
        let messageArea = document.getElementById("messageArea");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (message.value) {
                socket.emit('send message', { username: myname.value, message: message.value });
                message.value = "";
            }
        });

        socket.on("send message", (data) => {
            let messageContent = document.createElement("p");
            messageContent.textContent = `${data.username}: ${data.message}`;
            messageArea.appendChild(messageContent);
        });


        io.on('connection', (socket) => {
    socket.on('send message', (data) => {
        io.emit('send message', data);
    });
});