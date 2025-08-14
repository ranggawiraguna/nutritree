import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCNmNLJQPho75vd34hc6tigm8kupmV4mA",
  authDomain: "nutritree-digital.firebaseapp.com",
  projectId: "nutritree-digital",
  storageBucket: "nutritree-digital.firebasestorage.app",
  messagingSenderId: "974739442099",
};

const app = initializeApp(
  {
    ...firebaseConfig,
    appId: "1:974739442099:web:db8ab3cda9536f523ea3c6",
    measurementId: "G-VMQFH6Z6RE"
  },
  'Main'
);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const otherApp = initializeApp(
  {
    ...firebaseConfig,
    appId: "1:974739442099:web:e36440c424a4c0813ea3c6",
  measurementId: "G-H3YL6WDZDG"
  },
  'Secondary'
);
const otherAuth = getAuth(otherApp);

export { app, analytics, auth, db, otherApp, otherAuth };