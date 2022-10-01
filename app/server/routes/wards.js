const express = require('express');
const router = express.Router();

const wardApi = require('../api/ward');

router.get('/', (req, res) => {
    const query = req.query || {};
    wardApi.getWards(query.district_id)
        .then((wards) => {
            res.json(wards);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    const body = req.body;
    wardApi.saveWard(body)
        .then((ward) => {
            res.status(201).json(ward);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/', (req, res) => {
    const body = req.body;
    wardApi.saveWard(body)
        .then((ward) => {
            res.json(ward);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    wardApi.deleteWard(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;