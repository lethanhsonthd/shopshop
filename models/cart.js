class Cart {
    constructor(cart){
        this.items = cart.items || []
        this.totalQty = cart.totalQty || 0
        this.totalPrice = cart.totalPrice || 0
    }
    add(product){
        this.items.push(product)
        this.totalQty++
        this.totalPrice+=product.price
    }
    show(){
        this.items.forEach(element => {
            console.log(element)
        });
    }
}
module.exports = Cart