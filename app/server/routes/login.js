const express = require('express');
const router = express.Router();

const loginApi = require('../api/login');


router.post('/', (req, res) => {
    const body = req.body;
    loginApi.login(body)
        .then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(400).json(err);
        });
});


module.exports = router;