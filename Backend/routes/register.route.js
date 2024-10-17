const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const registerSchema = require("../model/register.model");

// Read (GET) all registered users
router.get('/', (req, res) => {
    controller.read(req, res, registerSchema);
});

// Create (POST) a new user
router.post('/', (req, res) => {
    controller.create(req, res, registerSchema);
});

// Update (PUT) a user by ID
router.put('/:id', (req, res) => {
    controller.update(req, res, registerSchema);
});

// Delete (DELETE) a user by ID
router.delete('/:id', (req, res) => {
    controller.remove(req, res, registerSchema);
});

module.exports = router;
