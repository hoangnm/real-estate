const express = require('express');
const router = express.Router();

const productApi = require('../api/product');

router.get('/', (req, res) => {
    const query = req.query || {};
    productApi.getProducts(query)
        .then((products) => {
            res.json(products);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    productApi.getProduct(id)
        .then((product) => {
            res.json(product);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    const body = req.body;
    productApi.saveProduct(body)
        .then((product) => {
            res.status(201).json(product);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/delete', (req, res) => {
    const body = req.body;
    productApi.deleteProducts(body)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/', (req, res) => {
    const body = req.body;
    productApi.saveProduct(body)
        .then((product) => {
            res.json(product);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    productApi.deleteProduct(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/upload/:id', (req, res) => {
    productApi.uploadImage(req, res)
        .then((product) => {
            res.json(product);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/import', (req, res) => {
    productApi.importProductsFromExcel(req, res)
        .then((products) => {
            res.json(products);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;