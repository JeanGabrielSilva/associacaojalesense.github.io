const express = require('express');

const routes = express.Router();

routes.post('/login', (req, res) => {
    res.send('login endpoint');
});

module.exports = routes;
