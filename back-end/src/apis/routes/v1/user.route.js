const express = require('express')

const { userController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')

const router = express.Router()

//router.post('/register', validate(authValidation.registerSchema), userController.register)
const authenticateMiddleware = require('../../../middlewares/auth')

router.post('/register', validate(authValidation.registerSchema), userController.register)

router.get('/verify-email', userController.verifyEmail)

router.post('/login', validate(authValidation.loginSchema), userController.login)

router.post('/forgot', userController.forgotPassword)
router.post('/refresh', userController.refreshToken)
router.post('/reset', authenticateMiddleware, userController.resetPassword)

router.put('/update', authenticateMiddleware, userController.updateUser)
router.put('/updateDefaultAddress', authenticateMiddleware, userController.updateDefault)
router.get('/getAllAddressUser', authenticateMiddleware, userController.getAllAddress)
router.post('/newAddress', authenticateMiddleware, userController.newAddress)
router.put('/updateAddress', authenticateMiddleware, userController.updateAddress)
router.put('/updateAddressDefault', authenticateMiddleware, userController.updateAddressDefault)
router.delete('/deleteAddress', authenticateMiddleware, userController.deleteAddress)

// Social Login
router.post('/google_login', userController.googleLogin)

router.post('/facebook_login', userController.facebookLogin)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - displayName
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
