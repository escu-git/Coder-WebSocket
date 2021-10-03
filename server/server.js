var express = require('express');
var app = express();
var appRouter = require('./helpers/appRouter.js').appRouter;
var _a = require('./helpers/socketFunctions.js'), manageNewProduct = _a.manageNewProduct, manageNewMessage = _a.manageNewMessage, persistentHistory = _a.persistentHistory;
var handlebarsEngine = require('./helpers/handlebars');
var PORT = process.env.PORT || 8080;
app.use('/api', appRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/',(req, res, next)=>{
//     console.log(req.url)
//     next()
// })
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(PORT, function () {
    console.log("Server initializated on port " + PORT);
});
io.on('connection', function (socket) {
    console.log('User connected');
    socket.emit('message', 'mensaje socket');
    persistentHistory(socket);
    socket.on('newProduct', function (data) {
        manageNewProduct(data, socket);
    });
    socket.on('newMessage', function (msg) {
        manageNewMessage(msg, socket, io);
    });
});
//function to export socket.io to other js files.
function getSocketFromApp() {
    return io;
}
//function to modularize handlebars config.
handlebarsEngine(app);
module.exports.importedIo = getSocketFromApp;
