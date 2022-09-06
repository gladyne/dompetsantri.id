const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        amount: Number,
        stock: Number,
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        }
    },
    {timestamps: true}    
);

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;