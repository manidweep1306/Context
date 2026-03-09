const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_CREDENTIALS || 'serviceAccountKey.json';
let db;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(path.resolve(serviceAccountPath));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log(`✅ Successfully connected to Firebase Project: ${serviceAccount.project_id}`);
  } else {
    console.warn(`Warning: ${serviceAccountPath} not found. Firebase features will be disabled.`);
  }
} catch (error) {
  console.warn(`Warning: Invalid Firebase credentials/setup. Firebase features disabled. Error: ${error.message}`);
}

module.exports = { admin, db };
