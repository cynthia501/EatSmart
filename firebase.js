//Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } 
  from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

//Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2JYgzi5TqRiUuBzegvD7WNRLWBmPP8ps",
  authDomain: "eatsmart-interns01.firebaseapp.com",
  projectId: "eatsmart-interns01",
  storageBucket: "eatsmart-interns01.firebasestorage.app",
  messagingSenderId: "105713485691",
  appId: "1:105713485691:web:ea6600c5ee31a63d5e9fde",
  measurementId: "G-B2HT96Z1YQ"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//Signup
window.handleSignup = async function (e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    //Save name to Firebase Auth profile
    await updateProfile(user, {
      displayName: `${firstName}`
    });

    console.log("Signup OK:", user);

    //Redirect to login page
    window.location.href = "login.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

//Login
window.handleLogin = async function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    //Get ID token
    const token = await user.getIdToken();
    console.log("ID Token:", token);

    //Use displayName (saved during signup)
     localStorage.setItem("displayName", user.displayName || "User");

    //Redirect to home page
    window.location.href = "../index.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
