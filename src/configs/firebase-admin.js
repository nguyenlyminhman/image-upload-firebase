
const admin = require("firebase-admin");

const serviceAccount = require("./metamint-app-v2-firebase-adminsdk-89tzf-7184986a50.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const dbs = admin.firestore(); 
module.exports = { dbs };