const testForm = document.getElementById("test-form");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const numTel = document.getElementById("num_tel");
const courriel = document.getElementById("email");
const comment = document.getElementById("comment");
const submitButton = document.getElementById("submitButton");
const buttonSpinner = document.getElementById("buttonSpinner");
const buttonText = document.getElementById("buttonText");

function afterSubmit(e) {
  e.preventDefault();

  let sexe = document.getElementsByName("sexe");
  for (let r1 of sexe) {
    if (r1.checked) {
      sexe = r1.value;
    }
  }

  let etage = document.getElementsByName("etage");
  for (let r2 of etage) {
    if (r2.checked) {
      etage = r2.value;
    }
  }

  let symptomes = document.getElementsByName("symptomes");
  for (let r3 of symptomes) {
    if (r3.checked) {
      symptomes = r3.value;
    }
  }

  const info = {
    nom: nom.value,
    prenom: prenom.value,
    sexe: sexe,
    num_tel: numTel.value,
    courriel: courriel.value,
    etage: etage,
    symptomes: symptomes,
    comment: comment.value || "",
  };

  const url =
    "https://script.google.com/macros/s/AKfycbwChGxJASS64-MwoMRfImgGLWtXHPFjN4Ku2QIT4kPEwhyHrv-IW55TVWv6mzros5C3hA/exec";

  buttonText.textContent = "Envoi en cours...";
  buttonSpinner.classList.remove("d-none");
  submitButton.disabled = true;

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    redirect: "follow",
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      testForm.reset();

      buttonText.textContent = "Envoyer";
      buttonSpinner.classList.add("d-none");
      submitButton.disabled = false;
    })
    .catch((err) => {
      console.log(err);
      testForm.reset();

      buttonText.textContent = "Envoyer";
      buttonSpinner.classList.add("d-none");
      submitButton.disabled = false;
    });
}

testForm.addEventListener("submit", afterSubmit);
