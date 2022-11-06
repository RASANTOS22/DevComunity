import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArHzHcof57qtzgWWK2OqjbNqA-qOKXpJ0",
    authDomain: "miniblog-868bc.firebaseapp.com",
    projectId: "miniblog-868bc",
    storageBucket: "miniblog-868bc.appspot.com",
    messagingSenderId: "963944455305",
    appId: "1:963944455305:web:e7643193240e236e4aba58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};
