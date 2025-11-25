// তোমার Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_APP",
  // অন্যান্য যদি লাগে যোগ করো
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const formTitle = document.getElementById("formTitle");

// শুরুতে লগইন ফর্ম দেখাবে
showLogin();

function showRegister() {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  formTitle.innerText = "অ্যাকাউন্ট তৈরি করুন";
}

function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  formTitle.innerText = "লগইন করুন";
}

// রেজিস্টার ফাংশন
function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("emailReg").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pass = document.getElementById("passReg").value;
  const cpass = document.getElementById("cpass").value;

  if (!name || !email || !phone || !pass || !cpass) {
    return alert("সব তথ্য পূরণ করুন!");
  }
  if (pass !== cpass) {
    return alert("পাসওয়ার্ড মিলছে না!");
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then((res) => {
      return db.collection("users").doc(res.user.uid).set({
        name,
        email,
        phone,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("অ্যাকাউন্ট তৈরি হয়েছে! এখন লগইন করুন।");
      showLogin();
      // ফর্ম ক্লিয়ার
      document.getElementById("registerForm").reset();
    })
    .catch((err) => alert(err.message));
}

// লগইন ফাংশন
function login() {
  const email = document.getElementById("emailLog").value.trim();
  const pass = document.getElementById("passLog").value;

  if (!email || !pass) return alert("ইমেইল ও পাসওয়ার্ড দিন!");

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      alert("লগইন সফল!");
      window.location.href = "home.html"; // তোমার মেইন পেজ
    })
    .catch((err) => alert(err.message));
}

// গুগল লগইন
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      alert("গুগল দিয়ে লগইন সফল!");
      window.location.href = "home.html";
    })
    .catch((err) => alert(err.message));
}

// লগআউট (পরে লাগলে ব্যবহার করো)
// function logout() {
//   auth.signOut().then(() => alert("লগআউট হয়েছে"));
// }