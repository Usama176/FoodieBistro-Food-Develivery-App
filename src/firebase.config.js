import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyALMmNtQqhw28ACUDFwwhnLspRDg96W6jM",
    authDomain: "restaurant-app-usama.firebaseapp.com",
    databaseURL: "https://restaurant-app-usama-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-usama",
    storageBucket: "restaurant-app-usama.appspot.com",
    messagingSenderId: "399153364536",
    appId: "1:399153364536:web:7e2c6727f7b9a42540b0cd"
};

// intialize app only if there is no app
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };