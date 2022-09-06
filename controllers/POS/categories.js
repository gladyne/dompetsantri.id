const moment = require('moment');
const Category = require('../../models/pos/category');

const getCategories = async (req, res) => {
    const category = await Category.find();
    category.forEach(element => {
        element.time = moment(category.createdAt).format("MMM Do YY");
        element.updateTime = moment(category.updatedAt).format("MMM Do YY");
    });
    res.render('./POS/categories', {categoryData: category});
}

const getAddCategory = (req, res) => {
    res.render('./POS/add-category');
}
const postAddCategory = async (req, res) => {
    const category = req.body.category;
    await Category.create({
        name: category,
    });
    res.redirect('/pos/categories');
}

const removeCategory = async (req, res) => {
    const id = req.params.id;
    await Category.deleteOne({_id: id});
    res.redirect('/pos/categories');
}

const getUpdateCategory = (req, res) => {
    const id = req.params.id
    res.render('./POS/update-category', {id: id});
}

const postUpdateCategory = async (req, res) => {
    const id = req.params.id;
    const newName = req.body.category;
    await Category.findOneAndUpdate({_id: id}, {name: newName});
    res.redirect('/pos/categories');
}


exports.getAddCategory = getAddCategory;
exports.postAddCategory = postAddCategory;
exports.getCategories = getCategories;
exports.removeCategory = removeCategory;
exports.getUpdateCategory = getUpdateCategory;
exports.postUpdateCategory = postUpdateCategory;