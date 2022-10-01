const express = require('express');
const router = express.Router();

const groupApi = require('../api/group-account');

router.get('/', (req, res) => {
    groupApi.getGroups()
        .then((groups) => {
            res.json(groups);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    groupApi.getGroup(id)
        .then((group) => {
            res.json(group);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    const body = req.body;
    groupApi.saveGroup(body)
        .then((product) => {
            res.status(201).json(product);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/', (req, res) => {
    const body = req.body;
    groupApi.saveGroup(body)
        .then((product) => {
            res.json(product);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    groupApi.deleteGroup(id)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});


router.post('/:groupId/permission', (req, res) => {
    const body = req.body;
    const groupId = req.params.groupId;
    groupApi.savePermission(groupId, body)
        .then(() => {
            res.json({ success: true });
        }).catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:groupId/permission', (req, res) => {
    const id = req.params.groupId;
    const body = req.body;
    groupApi.removePermission(id, body)
        .then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;