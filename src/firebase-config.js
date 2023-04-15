import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6exL-1oW17AIdOr_2lv-8wNMAfXEJzuA",
    authDomain: "fir-crud-61860.firebaseapp.com",
    projectId: "fir-crud-61860",
    storageBucket: "fir-crud-61860.appspot.com",
    messagingSenderId: "179512158413",
    appId: "1:179512158413:web:6efab9a5aa85a65ee76184",
    measurementId: "G-5C86Q6H70N"
  };

  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);