const express = require('express');
const router = express.Router();

const accountApi = require('../api/account');

router.get('/', (req, res) => {
    accountApi.getAccounts()
        .then((accounts) => {
            res.json(accounts);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    accountApi.getAccount(req.params.id)
        .then((account) => {
            res.json(account);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    const body = req.body;
    accountApi.saveAccount(body)
        .then((account) => {
            res.status(201).json(account);
        }).catch((err) => {
            res.status(400).json(err);
        });
});


router.put('/', (req, res) => {
    const body = req.body;
    accountApi.saveAccount(body)
        .then((account) => {
            res.json(account);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    accountApi.deleteAccount(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;