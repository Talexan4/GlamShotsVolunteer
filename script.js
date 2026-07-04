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

console.log("Firebase initialized with compat SDK");
console.log("Firestore ready:", !!db);

const form = document.getElementById("volunteerForm");
const submitButton = form?.querySelector("button[type='submit']");

if (form && submitButton) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedAvailability = Array.from(
      form.querySelectorAll('input[name="availability"]:checked')
    ).map((checkbox) => checkbox.value);

    const volunteerData = {
      name: form.elements.name.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      availability: selectedAvailability,
      role: form.elements.role.value,
      submittedAt: new Date().toISOString()
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    console.log("Submitting volunteerData:", volunteerData);

    try {
      await db.collection("volunteers").add(volunteerData);
      form.reset();
      alert("Thank you! Your volunteer form has been submitted.");
    } catch (error) {
      console.error("Error submitting volunteer form:", error?.message ?? error);
      alert("There was a problem submitting your form. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
}
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

console.log("Firebase initialized with compat SDK");
console.log("Firestore ready:", !!db);

const form = document.getElementById("volunteerForm");
const submitButton = form?.querySelector("button[type='submit']");

if (form && submitButton) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedAvailability = Array.from(
      form.querySelectorAll('input[name="availability"]:checked')
    ).map((checkbox) => checkbox.value);

    const volunteerData = {
      name: form.elements.name.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      availability: selectedAvailability,
      role: form.elements.role.value,
      submittedAt: new Date().toISOString()
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    console.log("Submitting volunteerData:", volunteerData);

    try {
      await db.collection("volunteers").add(volunteerData);
      form.reset();
      alert("Thank you! Your volunteer form has been submitted.");
    } catch (error) {
      console.error("Error submitting volunteer form:", error?.message ?? error);
      alert("There was a problem submitting your form. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
}
>>>>>>> e88c4c2fda0979190b53e1897cbd7275c4775580
