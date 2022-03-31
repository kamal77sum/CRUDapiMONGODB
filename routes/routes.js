const express = require('express');
const router = express.Router();
const Controller = require('../controller/middleware')


router.get('/get', Controller.get)
router.post('/post', Controller.post)
router.get('/single/:id', Controller.single)
router.put('/update/:id', Controller.update)
router.delete('/delete/:id', Controller.delete)

module.exports = router