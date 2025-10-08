import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_yebrfwm5tnmnVWTzj9dNzkGP_8Wqvj8",
  authDomain: "otp-project-846a9.firebaseapp.com",
  projectId: "otp-project-846a9",
  storageBucket: "otp-project-846a9.firebasestorage.app",
  messagingSenderId: "487403899918",
  appId: "1:487403899918:web:dec541a4e5ea73eb43805f",
  measurementId: "G-XV1PRQ2Z7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;