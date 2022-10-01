const express = require('express');
const router = express.Router();

const districtApi = require('../api/district');

router.get('/', (req, res) => {
    const query = req.query || {};
    districtApi.getDistricts(query.city_id)
        .then((districts) => {
            res.json(districts);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    const body = req.body;
    districtApi.saveDistrict(body)
        .then((district) => {
            res.status(201).json(district);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/', (req, res) => {
    const body = req.body;
    districtApi.saveDistrict(body)
        .then((district) => {
            res.json(district);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    districtApi.deleteDistrict(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;