
import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA2gI1VWFJztTH5e2VPhm9S_qq4uSwRRXY",
  authDomain: "cacheme-e2c52.firebaseapp.com",
  projectId: "cacheme-e2c52",
  storageBucket: "cacheme-e2c52.appspot.com",
  messagingSenderId: "261329796476",
  appId: "1:261329796476:web:1cfe98a6675b0668fdb8f9",
  measurementId: "G-ZM5566QVFB"
};


let app;
if(firebase.getApps().length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.getApp();
}

const auth = getAuth(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };