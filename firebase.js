import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2y71BKxvlIK1Zqvf-NVpvQwVnLTFkvWs",
  authDomain: "helse-3966d.firebaseapp.com",
  projectId: "helse-3966d",
  storageBucket: "helse-3966d.firebasestorage.app",
  messagingSenderId: "897803519593",
  appId: "1:897803519593:web:8ea1e8232f7aed981204f8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
