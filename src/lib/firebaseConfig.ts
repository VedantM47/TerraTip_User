// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Optional: if you plan to use Firestore

const firebaseConfig = {

  apiKey: "AIzaSyALJXJMuQvovNXjFZ1eCuTWTc2vJbO6v6Q",
  authDomain: "terra-tip.firebaseapp.com",
  projectId: "terra-tip",
  storageBucket: "terra-tip.firebasestorage.app",
  // storageBucket: "terra-tip.appspot.com",
  messagingSenderId: "648142405315",
  appId: "1:648142405315:web:22d26fe71c03dcd0b32c76",
  measurementId: "G-L1CM7SR7Q9"
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // Optional: if using Firestore
// export other services as needed (e.g., storage, functions)

// Optional: For Next.js to avoid re-initializing during hot-reloads in development
// if (!app.apps.length) {
//   initializeApp(firebaseConfig);
// }
// export const auth = getAuth();
// export const db = getFirestore();




// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyALJXJMuQvovNXjFZ1eCuTWTc2vJbO6v6Q",
//   authDomain: "terra-tip.firebaseapp.com",
//   projectId: "terra-tip",
//   storageBucket: "terra-tip.firebasestorage.app",
//   messagingSenderId: "648142405315",
//   appId: "1:648142405315:web:22d26fe71c03dcd0b32c76",
//   measurementId: "G-L1CM7SR7Q9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);