import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBt2frk9ndO4iq5Um2tEl7hC1SEOCcukII",
    authDomain: "facebook-messenger-clone-beac5.firebaseapp.com",
    projectId: "facebook-messenger-clone-beac5",
    storageBucket: "facebook-messenger-clone-beac5.appspot.com",
    messagingSenderId: "39743682099",
    appId: "1:39743682099:web:7b0b69ec1fdd6516171546"
});

const db = firebaseApp.firestore();

export default db;