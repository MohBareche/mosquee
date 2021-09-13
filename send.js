const testForm = document.getElementById("test-form");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const numTel = document.getElementById("num_tel");
const courriel = document.getElementById("email");
const comment = document.getElementById("comment");
const submitButton = document.getElementById("submitButton");

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
    comment: comment.value,
  };

  const url =
    "https://script.google.com/macros/s/AKfycbwChGxJASS64-MwoMRfImgGLWtXHPFjN4Ku2QIT4kPEwhyHrv-IW55TVWv6mzros5C3hA/exec";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    redirect: "success-page",
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      console.log("Something Went Wrong");
    });
}

testForm.addEventListener("submit", afterSubmit);
