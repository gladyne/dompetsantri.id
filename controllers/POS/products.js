const Category = require('../../models/pos/category');
const Product = require('../../models/pos/product');

const getProducts = async (req, res) => {
    const products = await Product.find().populate('category');
    res.render('./POS/products', {products: products});
}

const addProduct = async (req, res) => {
    const categories = await Category.find();
    res.render('./POS/add-product', {categories: categories});
}

const postAddProduct = async (req, res) => {
    const data = req.body;
    await Product.create({
        name: data.name,
        amount: data.amount,
        stock: data.stock,
        category: data.categories_id
    });
    res.redirect('/pos/products');
}

const removeProduct = async (req, res) => {
    const id = req.params.id;
    await Product.deleteOne({_id: id});
    res.redirect('/pos/products');
}

const editProduct = async (req, res) => {
    const id = req.params.id;
    const data = await Product.findOne({_id: id}).populate('category');
    const categories = await Category.find();
    res.render('./POS/edit-product', {product: data, categories: categories});
}

const postEditProduct = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    await Product.findOneAndUpdate(
        {_id: id},
        {
            name: newData.name,
            amount: newData.amount,
            stock: newData.stock,
            category: newData.categories_id
        }
    );
    res.redirect('/pos/products');
}

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.postAddProduct = postAddProduct;
exports.removeProduct = removeProduct;
exports.editProduct = editProduct;
exports.postEditProduct = postEditProduct;