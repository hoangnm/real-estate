const express = require('express');
const router = express.Router();

const customerStatusApi = require('../api/customer-status');

router.get('/', (req, res) => {
    customerStatusApi.getCustomerStatus()
        .then((status) => {
            res.json(status);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;