const express = require('express')
const router = express.Router()
//
const { storeController } = require('../../controllers')
const authenticateMiddleware = require('../../../middlewares/auth')

//
router.get('/getAllStore', storeController.getAllStore)
router.post('/create', storeController.createStore)

module.exports = router
