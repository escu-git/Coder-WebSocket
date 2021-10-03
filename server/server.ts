const express = require('express');
const app = express();
const {appRouter} = require('./helpers/appRouter.js');
const {manageNewProduct, manageNewMessage, persistentHistory} = require('./helpers/socketFunctions.js');
const handlebarsEngine = require('./helpers/handlebars');

const PORT = process.env.PORT || 8080;
app.use('/api', appRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
// app.use('/',(req, res, next)=>{
//     console.log(req.url)
//     next()
// })

const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(PORT, ()=>{
    console.log(`Server initializated on port ${PORT}`)
});

io.on('connection', (socket)=>{
    console.log('User connected')
    socket.emit('message', 'mensaje socket')
    persistentHistory(socket)
    socket.on('newProduct',(data)=>{
        manageNewProduct(data, socket)
    })
    socket.on('newMessage', msg=>{
        manageNewMessage(msg, socket, io)
    })
})

//function to export socket.io to other js files.
function getSocketFromApp(){
    return io;
}

//function to modularize handlebars config.
handlebarsEngine(app);

module.exports.importedIo=getSocketFromApp;

