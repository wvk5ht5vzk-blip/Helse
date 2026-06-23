import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const sliders = [
  "sleep",
  "mood",
  "energy",
  "stress",
  "activity"
];

// Oppdater tall ved slider
sliders.forEach(id => {

  const slider = document.getElementById(id);
  const value = document.getElementById(id + "Value");

  slider.addEventListener("input", () => {
    value.textContent = slider.value;
  });

});

// Lagre-knapp
document.getElementById("saveBtn").addEventListener("click", saveEntry);

async function saveEntry() {

  try {

    await addDoc(collection(db, "entries"), {

      date: new Date().toISOString().split("T")[0],

      sleep: Number(document.getElementById("sleep").value),
      mood: Number(document.getElementById("mood").value),
      energy: Number(document.getElementById("energy").value),
      stress: Number(document.getElementById("stress").value),
      activity: Number(document.getElementById("activity").value),

      notes: document.getElementById("notes").value,

      createdAt: serverTimestamp()

    });

    alert("Logg lagret ✅");

  } catch (error) {

  console.error(error);

  alert(error.message);



  }
}
