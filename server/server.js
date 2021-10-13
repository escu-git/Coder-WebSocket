const express = require('express');
const app = express();
const {appRouter, productos} = require('./helpers/appRouter.js');
const handlebarsEngine = require('./helpers/handlebars');
const product = require('./helpers/newProduct');

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
    socket.on('newProduct',(data)=>{
        const{title, price, thumbnail}=data;
        newProd = new product(title, price, thumbnail);
        productos.length < 1 ? newProd.productId(0) : newProd.productId(productos.length)
        productos.push(newProd)
        socket.emit('sentProduct', {newProd, productos});
    })
})


handlebarsEngine(app);

