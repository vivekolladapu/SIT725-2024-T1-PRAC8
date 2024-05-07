const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cardController = require('./controllers/CardController');

const app = express();
// const port = 3000;
let http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/get-cards', cardController.getCards);
app.post('/submit-form', cardController.submitForm);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views','index.html'));
});

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

let io = require('socket.io')(http);
http.listen(3000,
    () => {
        console.log('express server started');
    });

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
    socket.on('number', (msg) => {
        console.log('Random number: ' + msg);
    })
})

module.exports = app;

