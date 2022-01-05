const { initializeApp } = require('firebase/app')

const env = require('../configs/env')
const Logger = require('../libs/logger')
const log = new Logger(__filename)

module.exports = async () => {
    try {
        // Import the functions you need from the SDKs you need
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: 'AIzaSyAEunDnQk9STAiZvuV5i2Taq7-nREDpjbY',
            authDomain: 'fast-food-management-f0f8f.firebaseapp.com',
            databaseURL: 'https://fast-food-management-f0f8f-default-rtdb.asia-southeast1.firebasedatabase.app',
            projectId: 'fast-food-management-f0f8f',
            storageBucket: 'fast-food-management-f0f8f.appspot.com',
            messagingSenderId: '146011998378',
            appId: '1:146011998378:web:4f0c00a42be6d79673e8d3',
            measurementId: 'G-C568DW97RD',
        }

        // Initialize Firebase
        const app = await initializeApp(firebaseConfig)

        log.info('Successfully for Firebase connected!!')
    } catch (err) {
        log.error(`Failed to connect to Firebase - ${err.message}`)
        throw new Error(`Failed to connect to Firebase`)
    }
}
