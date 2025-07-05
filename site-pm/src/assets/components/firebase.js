import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAaAN7CT1FkNsptz7ErfAMRv_3YQ7dc4ZU",
  authDomain: "sitepm-f99ee.firebaseapp.com",
  databaseURL: "https://sitepm-f99ee-default-rtdb.firebaseio.com/",
  projectId: "sitepm-f99ee",
  storageBucket: "sitepm-f99ee.appspot.com", 
  messagingSenderId: "465212954524",
  appId: "1:465212954524:web:0a076f2dcd63adde615a59",
  measurementId: "G-BDKDR3R1T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);