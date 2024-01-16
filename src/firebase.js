// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.REACT_APIKEY,
  // authDomain: process.env.REACT_AUTHDOMAIN,
  // projectId: process.env.REACT_PROJECTID,
  // storageBucket: process.env.REACT_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_MESSAGINGSENDERID,
  // appId: process.env.REACT_APPID,
  // measurementId: process.env.REACT_MEASUREMENTID
  apiKey: "AIzaSyDzP4lJGjRHjbupuKi5ITEcfDgfyzYQ2u4",
  authDomain: "react-ex-7273e.firebaseapp.com",
  projectId: "react-ex-7273e",
  storageBucket: "react-ex-7273e.appspot.com",
  messagingSenderId: "983533437241",
  appId: "1:983533437241:web:bb1507098a3c2d8c0568e8",
  measurementId: "G-R8NV2CZ9KD"
};

// Initialize Firebase
// export const firebase = initializeApp(firebaseConfig);

//https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.send("Working");
  } else if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;
    const auth = getAuth();
    signInWithEmailAndPassword(email, password)
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((e) => {
        return res.status(500).json({ e: `${e}` });
      });
  }
}