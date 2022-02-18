// import { initializeApp } from "firebase/app";

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBMQqWCRuR1CpIsdm-93gHG5IJi_yhg9k8",
  authDomain: "inspection-6c319.firebaseapp.com",
  projectId: "inspection-6c319",
  storageBucket: "inspection-6c319.appspot.com",
  messagingSenderId: "300530642294",
  appId: "1:300530642294:web:6540c3d91d5f8775cc9e57"
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const time = firebase.firestore.FieldValue.serverTimeStamp

export { auth, db, time };
