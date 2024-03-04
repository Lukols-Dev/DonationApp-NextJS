import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeg-t8jWJU4ngd0GpYm-2L4dB-7tMBjlM",
  authDomain: "tipey-c631a.firebaseapp.com",
  projectId: "tipey-c631a",
  storageBucket: "tipey-c631a.appspot.com",
  messagingSenderId: "2013776465",
  appId: "1:2013776465:web:cca432e70432bec08c8670",
  measurementId: "G-1E1FPK7TVM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, auth, firestore, storage };
