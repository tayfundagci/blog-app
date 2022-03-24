import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const key = process.env.REACT_APP_FIREBASE_KEY;
const authdomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const storagebucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const messagingsenderid = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const appid = process.env.REACT_APP_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: `${key}`,
  authDomain: `${authdomain}`,
  projectId: "blog-app-d31d8",
  storageBucket: `${storagebucket}`,
  messagingSenderId: `${messagingsenderid}`,
  appId: `${appid}`,
};

initializeApp(firebaseConfig);

const db = getFirestore();
export { db };
