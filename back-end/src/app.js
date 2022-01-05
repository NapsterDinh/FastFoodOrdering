const Logger = require('./libs/logger')

const bannerLogger = require('./libs/banner')

const expressLoader = require('./loaders/expressLoader')
const mongooseLoader = require('./loaders/mongooseLoader')
const swaggerLoader = require('./loaders/swaggerLoader')
const winstonLoader = require('./loaders/winstonLoader')
const firebaseLoader = require('./loaders/firebaseLoader')

/**
 * FAST FOOD MANAGEMENT
 * ----------------------------------------
 *
 * This is Fast Food Management - Back End application written in Vanilla Javascript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
const log = new Logger(__filename)

// Init loaders
async function initApp() {
    // logging
    winstonLoader()

    // Database
    await mongooseLoader()

    // Firebase
    await firebaseLoader()

    // express
    const app = expressLoader()

    // swagger
    swaggerLoader(app)
}

initApp()
    .then(() => bannerLogger(log))
    .catch((error) => log.error('Application is crashed: ' + error))
