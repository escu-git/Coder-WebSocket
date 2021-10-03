const fs = require('fs');

class Product{
    constructor(title, price, thumbnail){
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
    productId(lastId){
        this.id= lastId+1
    }
}


class File{
    constructor(file){
        this.file = file;
    };

    async writeFile(msg){
        try{
            let file = `./server/files/${this.file}`
            fs.writeFileSync(file, JSON.stringify(msg))
        }catch(err){
            console.log(err)
        }
    };

     async readFile(){
        new Promise(async(resolve, reject)=>{
            try{
                let fileData = await fs.readFileSync(`./server/files/${this.file}`, 'utf-8')
                let result = JSON.parse(fileData);
                resolve(result);
            }catch(err){
                reject(err)
            }
        })
    };

    deleteChat(){
        try{
            fs.unlink(`./server/files/${this.file}`)
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = {Product,File};