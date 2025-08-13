import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCNmNLJQPho75vd34hc6tigm8kupmV4mA",
  authDomain: "nutritree-digital.firebaseapp.com",
  projectId: "nutritree-digital",
  storageBucket: "nutritree-digital.firebasestorage.app",
  messagingSenderId: "974739442099",
  appId: "1:974739442099:web:db8ab3cda9536f523ea3c6",
  measurementId: "G-VMQFH6Z6RE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

export { app, analytics, auth, db, storage };
