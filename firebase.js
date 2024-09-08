
// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS3lXtmheZ_oWaLQAidxF3tuTgR8H2wPw",
  authDomain: "stickers-d7ba9.firebaseapp.com",
  databaseURL: "https://stickers-d7ba9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "stickers-d7ba9",
  storageBucket: "stickers-d7ba9.appspot.com",
  messagingSenderId: "229310952516",
  appId: "1:229310952516:web:6ec6f7fb154af5fd5cf811",
  measurementId: "G-H10TEHQHEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference your database
const contactFormDB = ref(database, "stikers");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const nom = getElementVal("nom");
  const prenom = getElementVal("prenom");
  const number = getElementVal("number");
  const adresse = getElementVal("adresse");
  const mail = getElementVal("mail");
  const sticker = getElementVal("sticker");

  saveMessages(nom, prenom, number, adresse, mail, sticker);

  // Enable and remove the alert
  // document.querySelector(".alert").style.display = "block";
  // setTimeout(() => {
  //   document.querySelector(".alert").style.display = "none";
  // }, 3000);

  // Reset the form
  document.getElementById("contactForm").reset();
}

function saveMessages(nom, prenom, number, adresse, mail, sticker) {
  const newContactForm = push(contactFormDB);
  set(newContactForm, {
    nom: nom,
    prenom: prenom,
    number: number,
    adresse: adresse,
    mail: mail,
    sticker: sticker,
  });
  alert("Submission successful!"); // Alert the user on successful submission

}

function getElementVal(id) {
  return document.getElementById(id).value;
}
