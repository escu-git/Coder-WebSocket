const express = require('express');
const appRouter = express.Router();
const Product = require('./classes');

const productos:Array = [];

// appRouter.post('/',(req:any, res:any)=>{
//     console.log(req.body)
//     res.json({message: req.body})
// })

appRouter.get('/home', (req:any, res:any)=>{
    try{
    if(productos.length != 0) {
        res.render('main', {products: productos, exist:true})
    }else{
        res.render('main', {exist:false})
    }
    }catch(err){
        res.status(400).json({error:err})
    }
})

appRouter.get('/productos/listar', (req:any, res:any)=>{
    try{
        if(productos.length == 0){
            return res.status(400).json({error:'No hay productos para mostrar'})
        }else{
            return res.status(200).json({data:productos})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({err:err})
    }
});

appRouter.get('/productos/listar/:id', (req:any, res:any)=>{
    try{
        const productId:object = req.params.id;
        const showProduct:object = productos.find((x:any)=>x.id == productId)
        showProduct == undefined ? res.status(400).json({err:`Product ${productId} does not exist`}) : res.status(200).json({data:showProduct})
    }catch(err){
        res.status(400).json({err:err})
    }
});

appRouter.post('/productos/guardar', (req:any, res:any)=>{
   try{
    const {title, price, thumbnail}=req.body;
    const newProduct = new product(title, price, thumbnail);
    productos.length < 1 ? newProduct.productId(0) : newProduct.productId(productos.length)
    productos.push(newProduct)
    return res.redirect('/api/productos/vista')
    }catch(err){
        console.log(err)
    }
});

appRouter.put('/productos/update/:id', (req:any, res:any)=>{
    try{
        const {id} = req.body;
        const productIndex = productos.findIndex((x:any)=>x.id == id);
        const productAttributes = Object.entries(req.body)
        productAttributes.forEach(x=>{
            let attr = x[0];
            let newValue = x[1];
            if(x !== null){
                productos[productIndex][attr] = newValue
            }
        })
        res.status(200).json({modifiedProduct:productos[productIndex], allProducts:productos })
    }catch(err){
        res.status(400).json({error: err})
    }
})

appRouter.delete('/productos/delete/:id', (req:any, res:any)=>{
    try{
        const idRequested:number = req.params.id;
        const productIndex:number = productos.findIndex((x:any)=> x.id == idRequested);
        const deletedProduct = () => {
            productos.splice(productIndex,1)
            res.status(200).json({deletedProduct:productos[productIndex], allProducts:productos})
        }
        productIndex == undefined ? 
        res.status(400).json({error:``}) : deletedProduct()
    }catch(err){
        res.status(400).json({err:err})
    }
})

module.exports = {appRouter, productos}