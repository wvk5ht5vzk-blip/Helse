import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/* -------------------------
   NAVIGASJON
------------------------- */

const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll("[data-screen]");

function showScreen(screenId) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

  if (screenId === "history-screen") {
    loadHistory();
  }
}

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    const screenId = button.dataset.screen;

    showScreen(screenId);

  });

});

/* -------------------------
   SLIDERS
------------------------- */

const sliders = [
  "sleep",
  "mood",
  "energy",
  "stress",
  "activity"
];

sliders.forEach(id => {

  const slider = document.getElementById(id);
  const value = document.getElementById(id + "Value");

  slider.addEventListener("input", () => {
    value.textContent = slider.value;
  });

});

/* -------------------------
   LAGRING
------------------------- */

document
  .getElementById("saveBtn")
  .addEventListener("click", saveEntry);

async function saveEntry() {

  try {

    const today = new Date().toISOString().split("T")[0];

    await setDoc(doc(db, "entries", today), {

      date: today,

      sleep: Number(document.getElementById("sleep").value),
      mood: Number(document.getElementById("mood").value),
      energy: Number(document.getElementById("energy").value),
      stress: Number(document.getElementById("stress").value),
      activity: Number(document.getElementById("activity").value),

      notes: document.getElementById("notes").value,

      createdAt: serverTimestamp()

    });

    alert("Logg lagret ✅");

    document.getElementById("notes").value = "";

    await loadHistory();
    await loadTodayStatus();

    showScreen("home-screen");

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

/* -------------------------
   HISTORIKK
------------------------- */

async function loadHistory() {

  const historyDiv = document.getElementById("history");

  if (!historyDiv) return;

  const q = query(
    collection(db, "entries"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  historyDiv.innerHTML = "";

  snapshot.forEach(doc => {

    const data = doc.data();

    historyDiv.innerHTML += `
      <div class="history-card">
        <strong>${data.date}</strong><br><br>

        😴 ${data.sleep}
        &nbsp;&nbsp;
        😊 ${data.mood}
        &nbsp;&nbsp;
        ⚡ ${data.energy}
        &nbsp;&nbsp;
        😰 ${data.stress}
        &nbsp;&nbsp;
        🏃 ${data.activity}

        <br><br>

        📝 ${data.notes || ""}
      </div>
    `;

  });

}

async function loadTodayStatus() {

  const today = new Date().toISOString().split("T")[0];

  const docRef = doc(db, "entries", today);

  const docSnap = await getDoc(docRef);

  const statusDiv = document.getElementById("todayStatus");

  if (!statusDiv) return;

  if (!docSnap.exists()) {

    statusDiv.innerHTML = `
      Ingen logg registrert i dag.
    `;

    return;
  }

  const data = docSnap.data();

  statusDiv.innerHTML = `
  <div class="status-grid">

    <div class="status-item">
      <div class="emoji">😴</div>
      <div class="value">${data.sleep}</div>
    </div>

    <div class="status-item">
      <div class="emoji">😊</div>
      <div class="value">${data.mood}</div>
    </div>

    <div class="status-item">
      <div class="emoji">⚡</div>
      <div class="value">${data.energy}</div>
    </div>

    <div class="status-item">
      <div class="emoji">😰</div>
      <div class="value">${data.stress}</div>
    </div>

    <div class="status-item">
      <div class="emoji">🏃</div>
      <div class="value">${data.activity}</div>
    </div>

  </div>
`;
}

loadHistory();
loadTodayStatus();
