import firebase from "firebase/compat/app";

const config = {
  apiKey: "AIzaSyA6ebPWsU_ygExehG75WlnoCA88wNfHi34",
  authDomain: "quiz-app-48c78.firebaseapp.com",
  projectId: "quiz-app-48c78",
  storageBucket: "quiz-app-48c78.appspot.com",
  messagingSenderId: "13093596495",
  appId: "1:13093596495:web:e244041075230b5d31693a",
  measurementId: "G-KJT42MQ3S4",
};

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();