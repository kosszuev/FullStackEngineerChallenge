import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDz7djSZImSNp8Bbso1RQEbNIW-ZPtRJT0",
  authDomain: "zaz-vue.firebaseapp.com",
  projectId: "zaz-vue",
  storageBucket: "zaz-vue.appspot.com",
  messagingSenderId: "493291565110",
  appId: "1:493291565110:web:1dd078dba69e245664e897",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
