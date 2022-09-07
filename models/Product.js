const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required : true,
        unique : false
    },
    price : {
        type: Number,
        required : [true,"price is requerid"],
    },
    description : {
        type : String,
        required : false
    }
});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;