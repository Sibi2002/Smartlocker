import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDF-qPOZUVKKij0oCGdVGY2vYUnCfvWUu0",
  authDomain: "authentication-b1d0f.firebaseapp.com",
  projectId: "authentication-b1d0f",
  storageBucket: "authentication-b1d0f.appspot.com",
  messagingSenderId: "204728982488",
  appId: "1:204728982488:web:6cfffae60f04af703af0ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth=getAuth(app)
export default app;