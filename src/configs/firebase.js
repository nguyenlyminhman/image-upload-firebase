// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5_2GMwFI2Kq77bPvAKZjU6tzaYvZC8-k",
  authDomain: "metamint-app-v2.firebaseapp.com",
  projectId: "metamint-app-v2",
  storageBucket: "metamint-app-v2.appspot.com",
  messagingSenderId: "71788270767",
  appId: "1:71788270767:web:44fce5676a4c3f2c35b05a"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// module.exports = { db };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

module.exports = { storage };