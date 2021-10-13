
class product{
    constructor(title, price, thumbnail){
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
    productId(lastId){
        this.id= lastId+1
    }
}

module.exports = product;