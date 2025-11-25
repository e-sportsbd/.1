// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);

// Go to pages
function goRegister() {
  window.location.href = "register.html";
}

function goLogin() {
  window.location.href = "login.html";
}

// Register User
function register() {
  let email = document.getElementById("regEmail").value;
  let pass = document.getElementById("regPass").value;

  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => {
      alert("Registration Successful!");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}

// Login User
function login() {
  let email = document.getElementById("logEmail").value;
  let pass = document.getElementById("logPass").value;

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      alert("Login Successful!");
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
}