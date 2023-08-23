import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const app=firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
});
const db = getFirestore(app);
const storage = getStorage(app);

console.log(firebase.app().options);
