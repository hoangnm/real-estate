const express = require('express');
const router = express.Router();

const resourceApi = require('../api/app-resources');

router.get('/', (req, res) => {
    resourceApi.getAppResources()
        .then((status) => {
            res.json(status);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;