const dotenv = require("dotenv");
dotenv.config();

module.exports = firebaseConfig={
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSEGING_SENDER_ID,
        appId: process.env.APP_ID
    }

