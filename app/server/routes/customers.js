const express = require('express');
const router = express.Router();

const customerApi = require('../api/customer');

router.get('/', (req, res) => {
    const query = req.query || {};
    customerApi.getCustomers(query)
        .then((customers) => {
            res.json(customers);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    customerApi.getCustomer(id)
        .then((customer) => {
            res.json(customer);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    const body = req.body;
    customerApi.saveCustomer(body)
        .then((customer) => {
            res.status(201).json(customer);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/delete', (req, res) => {
    const body = req.body;
    customerApi.deleteCustomers(body)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/', (req, res) => {
    const body = req.body;
    customerApi.saveCustomer(body)
        .then((customer) => {
            res.json(customer);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    customerApi.deleteCustomer(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/upload/:id', (req, res) => {
    customerApi.uploadImage(req, res)
        .then((customer) => {
            res.json(customer);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/import', (req, res) => {
    customerApi.importCustomersFromExcel(req, res)
        .then((customers) => {
            res.json(customers);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;