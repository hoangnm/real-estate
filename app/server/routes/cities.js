const express = require('express');
const router = express.Router();

const citiesApi = require('../api/city');

router.get('/', (req, res) => {
    citiesApi.getCities()
        .then((cities) => {
            res.json(cities);
        }).catch((err) => {
            res.status(400).json(err);
        });
});


router.post('/', (req, res) => {
    const body = req.body;
    citiesApi.saveCity(body)
        .then((city) => {
            res.status(201).json(city);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/', (req, res) => {
    const body = req.body;
    citiesApi.saveCity(body)
        .then((city) => {
            res.json(city);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    citiesApi.deleteCity(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;