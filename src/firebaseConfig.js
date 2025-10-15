import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration (from your Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCpZzSAQ5J0GZjbHpKeHXc6ntTsrHMhwrA",
  authDomain: "iiesp-e08b6.firebaseapp.com",
  projectId: "iiesp-e08b6",
  storageBucket: "iiesp-e08b6.firebasestorage.app",
  messagingSenderId: "476028577163",
  appId: "1:476028577163:web:953ee283fde00171f77b8e",
  measurementId: "G-ZD8CZCWEG2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth (Email/Password + Google + Facebook)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// ✅ Optional analytics (won’t crash if not supported in some environments like Vercel)
(async () => {
  if (await isSupported()) {
    getAnalytics(app);
  }
})();

export default app;
