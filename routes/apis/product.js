const express = require('express');
const Product = require('../../models/pos/product');

const app = express.Router();

app.get('/api/product', async (req, res) => {
    try{
        const products = await Product.find().populate('category');
        res.status(200).send(products);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

app.post('/api/product',async (req, res) => {
    try{
        const data = req.body;
        await Product.create({
            name: data.name,
            amount: data.amount,
            stock: data.stock,
            category: data.categories_id
        });
        res.status(201).json({Success: "Success"});
    } catch(e) {
        res.status(500).json({Succes: `${e.message}`});
    }     
});

app.delete('/api/product/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        res.status(200).json({Status: "deleted"});
    } catch(e) {
        res.status(500).json({Status: `${e.message}`});
    }
});

app.put('/api/product/:id', async (req, res) => {
    try{
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
        res.status(201).json({Update: "Updated"});
    } catch(e) {
        res.status(500).json({Update: `${e.message}`});
    }
})

module.exports = app;