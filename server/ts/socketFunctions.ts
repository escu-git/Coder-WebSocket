const fs = require('fs');
const {product, file} = require('./classes');
const {productos:any} = require('./appRouter');
//Function to manage new products from form.
const chatFile = 'index.txt'
let messageHistory: any=[];

function manageNewProduct(data:any, socket:any){
    const{title, price, thumbnail}=data;
    const newProd: object = new product(title, price, thumbnail);
    productos.length < 1 ? newProd.productId(0) : newProd.productId(productos.length)
    productos.push(newProd)
    socket.emit('sentProduct', {newProd, productos});
}

//Function to manage new message coming from online chat.
function manageNewMessage(msg, socket, io){
    const date = new Date().toLocaleDateString('en-GB');
    const messageData ={
        userId:socket.id,
        message:msg.msg,
        userName:msg.user,
        date:date.toString(),
    }
    messageHistory.push(messageData);
    let persistentFile =new File(chatFile);
    persistentFile.writeFile(messageHistory)
    io.sockets.emit('showMessage', messageHistory)
}

async function persistentHistory(socket){
    try{
        //!CAMI, no pude utilizar el resolve del método readFile() de la clase file './helpers/classes.js'
        // let persistentFile = new file(chatFile)
        // let resultado = await persistentFile.readFile()
        // console.log(resultado)
        let readPersistentFile = fs.readFileSync(`./server/files/${chatFile}`, 'utf-8')
        let result = JSON.parse(readPersistentFile);
        messageHistory = result
        socket.emit('showMessage', messageHistory)
    }catch(err){
        console.log(err)
    }
    // if(checkFile){
    //     messageHistory=checkFile;
    //     console.log(messageHistory)
    // }else{
    //     return
    // }
}


module.exports={manageNewProduct, manageNewMessage, persistentHistory}