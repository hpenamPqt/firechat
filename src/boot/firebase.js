import { boot } from 'quasar/wrappers'

// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc9eXEhbToRiWFVXsZsPyiVbdtCIbDC2k",
  authDomain: "firechat-quasar-hpm.firebaseapp.com",
  projectId: "firechat-quasar-hpm",
  storageBucket: "firechat-quasar-hpm.appspot.com",
  messagingSenderId: "547499626571",
  appId: "1:547499626571:web:fd4eea5024a9953087bdce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = firebase.firestore();
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

// export {  db, auth, marcaTiempo };
// export {  db, marcaTiempo };
export { db, auth }


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ db } ) => {
  // something to do
})
