<<<<<<< HEAD
const firebaseConfig = {
  apiKey: "AIzaSyC39Q_A8zrJEYVT-kZ7e45xNhZ63GGaWxE",
  authDomain: "glamshotsvolunteer.firebaseapp.com",
  projectId: "glamshotsvolunteer",
  storageBucket: "glamshotsvolunteer.firebasestorage.app",
  messagingSenderId: "907269160076",
  appId: "1:907269160076:web:edf506ea1e8492aa428fa9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const refreshButton = document.getElementById("refreshButton");
const volunteerTableBody = document.getElementById("volunteerTableBody");
const statusMessage = document.getElementById("statusMessage");
const editPanel = document.getElementById("editPanel");
const editForm = document.getElementById("editForm");
const cancelEditButton = document.getElementById("cancelEdit");

let volunteers = [];

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${isError ? "error" : "success"}`;
}

function formatAvailability(value) {
  if (!value) return "—";
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

function formatRole(value) {
  if (!value) return "—";
  return value.replace(/-/g, " ");
}

function renderTable() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedRole = roleFilter.value;

  const filtered = volunteers.filter((volunteer) => {
    const haystack = [
      volunteer.name,
      volunteer.lastName,
      volunteer.email,
      volunteer.role,
      volunteer.availability
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = haystack.includes(searchTerm);
    const matchesRole = !selectedRole || volunteer.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  volunteerTableBody.innerHTML = "";

  if (!filtered.length) {
    volunteerTableBody.innerHTML = '<tr><td colspan="7">No volunteers found.</td></tr>';
    return;
  }

  filtered.forEach((volunteer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${volunteer.name || "—"}</td>
      <td>${volunteer.lastName || "—"}</td>
      <td>${volunteer.email || "—"}</td>
      <td>${volunteer.phone || "—"}</td>
      <td>${formatRole(volunteer.role)}</td>
      <td>${formatAvailability(volunteer.availability)}</td>
      <td>
        <button type="button" class="edit-btn" data-id="${volunteer.id}">Edit</button>
        <button type="button" class="delete-btn" data-id="${volunteer.id}">Delete</button>
      </td>
    `;
    volunteerTableBody.appendChild(row);
  });
}

async function loadVolunteers() {
  try {
    showStatus("Loading volunteers...");
    const snapshot = await db.collection("volunteers").orderBy("submittedAt", "desc").get();
    volunteers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderTable();
    showStatus(`Loaded ${volunteers.length} volunteer${volunteers.length === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("Error loading volunteers:", error);
    showStatus("Could not load volunteers from Firestore.", true);
  }
}

async function deleteVolunteer(id) {
  if (!confirm("Delete this volunteer record?")) return;

  try {
    await db.collection("volunteers").doc(id).delete();
    volunteers = volunteers.filter((volunteer) => volunteer.id !== id);
    renderTable();
    showStatus("Volunteer deleted.");
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    showStatus("Could not delete volunteer.", true);
  }
}

function openEditPanel(volunteer) {
  editPanel.classList.remove("hidden");
  document.getElementById("editDocId").value = volunteer.id;
  document.getElementById("editFirstName").value = volunteer.name || "";
  document.getElementById("editLastName").value = volunteer.lastName || "";
  document.getElementById("editEmail").value = volunteer.email || "";
  document.getElementById("editPhone").value = volunteer.phone || "";
  document.getElementById("editRole").value = volunteer.role || "";
  document.getElementById("editAvailability").value = Array.isArray(volunteer.availability)
    ? volunteer.availability.join(", ")
    : volunteer.availability || "";
}

async function saveVolunteer(event) {
  event.preventDefault();
  const id = document.getElementById("editDocId").value;
  const updatedData = {
    name: document.getElementById("editFirstName").value.trim(),
    lastName: document.getElementById("editLastName").value.trim(),
    email: document.getElementById("editEmail").value.trim(),
    phone: document.getElementById("editPhone").value.trim(),
    role: document.getElementById("editRole").value,
    availability: document.getElementById("editAvailability").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  };

  try {
    await db.collection("volunteers").doc(id).update(updatedData);
    const index = volunteers.findIndex((volunteer) => volunteer.id === id);
    if (index !== -1) {
      volunteers[index] = { ...volunteers[index], ...updatedData };
    }
    renderTable();
    editPanel.classList.add("hidden");
    editForm.reset();
    showStatus("Volunteer updated.");
  } catch (error) {
    console.error("Error updating volunteer:", error);
    showStatus("Could not update volunteer.", true);
  }
}

searchInput.addEventListener("input", renderTable);
roleFilter.addEventListener("change", renderTable);
refreshButton.addEventListener("click", loadVolunteers);
cancelEditButton.addEventListener("click", () => {
  editPanel.classList.add("hidden");
  editForm.reset();
});

editForm.addEventListener("submit", saveVolunteer);

volunteerTableBody.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("edit-btn")) {
    const id = target.getAttribute("data-id");
    const volunteer = volunteers.find((item) => item.id === id);
    if (volunteer) openEditPanel(volunteer);
  }

  if (target.classList.contains("delete-btn")) {
    const id = target.getAttribute("data-id");
    deleteVolunteer(id);
  }
});

loadVolunteers();
=======
const firebaseConfig = {
  apiKey: "AIzaSyC39Q_A8zrJEYVT-kZ7e45xNhZ63GGaWxE",
  authDomain: "glamshotsvolunteer.firebaseapp.com",
  projectId: "glamshotsvolunteer",
  storageBucket: "glamshotsvolunteer.firebasestorage.app",
  messagingSenderId: "907269160076",
  appId: "1:907269160076:web:edf506ea1e8492aa428fa9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const refreshButton = document.getElementById("refreshButton");
const volunteerTableBody = document.getElementById("volunteerTableBody");
const statusMessage = document.getElementById("statusMessage");
const editPanel = document.getElementById("editPanel");
const editForm = document.getElementById("editForm");
const cancelEditButton = document.getElementById("cancelEdit");

let volunteers = [];

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${isError ? "error" : "success"}`;
}

function formatAvailability(value) {
  if (!value) return "—";
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

function formatRole(value) {
  if (!value) return "—";
  return value.replace(/-/g, " ");
}

function renderTable() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedRole = roleFilter.value;

  const filtered = volunteers.filter((volunteer) => {
    const haystack = [
      volunteer.name,
      volunteer.lastName,
      volunteer.email,
      volunteer.role,
      volunteer.availability
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = haystack.includes(searchTerm);
    const matchesRole = !selectedRole || volunteer.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  volunteerTableBody.innerHTML = "";

  if (!filtered.length) {
    volunteerTableBody.innerHTML = '<tr><td colspan="7">No volunteers found.</td></tr>';
    return;
  }

  filtered.forEach((volunteer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${volunteer.name || "—"}</td>
      <td>${volunteer.lastName || "—"}</td>
      <td>${volunteer.email || "—"}</td>
      <td>${volunteer.phone || "—"}</td>
      <td>${formatRole(volunteer.role)}</td>
      <td>${formatAvailability(volunteer.availability)}</td>
      <td>
        <button type="button" class="edit-btn" data-id="${volunteer.id}">Edit</button>
        <button type="button" class="delete-btn" data-id="${volunteer.id}">Delete</button>
      </td>
    `;
    volunteerTableBody.appendChild(row);
  });
}

async function loadVolunteers() {
  try {
    showStatus("Loading volunteers...");
    const snapshot = await db.collection("volunteers").orderBy("submittedAt", "desc").get();
    volunteers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderTable();
    showStatus(`Loaded ${volunteers.length} volunteer${volunteers.length === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("Error loading volunteers:", error);
    showStatus("Could not load volunteers from Firestore.", true);
  }
}

async function deleteVolunteer(id) {
  if (!confirm("Delete this volunteer record?")) return;

  try {
    await db.collection("volunteers").doc(id).delete();
    volunteers = volunteers.filter((volunteer) => volunteer.id !== id);
    renderTable();
    showStatus("Volunteer deleted.");
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    showStatus("Could not delete volunteer.", true);
  }
}

function openEditPanel(volunteer) {
  editPanel.classList.remove("hidden");
  document.getElementById("editDocId").value = volunteer.id;
  document.getElementById("editFirstName").value = volunteer.name || "";
  document.getElementById("editLastName").value = volunteer.lastName || "";
  document.getElementById("editEmail").value = volunteer.email || "";
  document.getElementById("editPhone").value = volunteer.phone || "";
  document.getElementById("editRole").value = volunteer.role || "";
  document.getElementById("editAvailability").value = Array.isArray(volunteer.availability)
    ? volunteer.availability.join(", ")
    : volunteer.availability || "";
}

async function saveVolunteer(event) {
  event.preventDefault();
  const id = document.getElementById("editDocId").value;
  const updatedData = {
    name: document.getElementById("editFirstName").value.trim(),
    lastName: document.getElementById("editLastName").value.trim(),
    email: document.getElementById("editEmail").value.trim(),
    phone: document.getElementById("editPhone").value.trim(),
    role: document.getElementById("editRole").value,
    availability: document.getElementById("editAvailability").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  };

  try {
    await db.collection("volunteers").doc(id).update(updatedData);
    const index = volunteers.findIndex((volunteer) => volunteer.id === id);
    if (index !== -1) {
      volunteers[index] = { ...volunteers[index], ...updatedData };
    }
    renderTable();
    editPanel.classList.add("hidden");
    editForm.reset();
    showStatus("Volunteer updated.");
  } catch (error) {
    console.error("Error updating volunteer:", error);
    showStatus("Could not update volunteer.", true);
  }
}

searchInput.addEventListener("input", renderTable);
roleFilter.addEventListener("change", renderTable);
refreshButton.addEventListener("click", loadVolunteers);
cancelEditButton.addEventListener("click", () => {
  editPanel.classList.add("hidden");
  editForm.reset();
});

editForm.addEventListener("submit", saveVolunteer);

volunteerTableBody.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("edit-btn")) {
    const id = target.getAttribute("data-id");
    const volunteer = volunteers.find((item) => item.id === id);
    if (volunteer) openEditPanel(volunteer);
  }

  if (target.classList.contains("delete-btn")) {
    const id = target.getAttribute("data-id");
    deleteVolunteer(id);
  }
});

loadVolunteers();
>>>>>>> e88c4c2fda0979190b53e1897cbd7275c4775580
