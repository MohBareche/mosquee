/* TODAY */
function loadTimePrayTodayMtl(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      const prieres = await data.results.datetime[0].times;
      const dateGregorian = await data.results.datetime[0].date.gregorian;
      const dateHijri = await data.results.datetime[0].date.hijri;

      document.getElementById("date-gregorian").innerHTML = dateGregorian;
      document.getElementById(
        "date-hijri"
      ).innerHTML = `${dateHijri}     الموافق`;

      /* Clear the table */
      tableHead.innerHTML = "<tr></tr>";
      tableBody.innerHTML = "";

      /* Populate the headers */
      let titres = [];
      titres = Object.keys(prieres);
      for (let titre of titres) {
        const headerElement = document.createElement("th");
        headerElement.textContent = titre;
        tableHead.querySelector("tr").appendChild(headerElement);
      }

      /* Populate the row */
      let heures = [];
      heures = Object.values(prieres);
      const rowElement = document.createElement("tr");
      for (let heure of heures) {
        const cellText = document.createElement("td");
        cellText.textContent = heure;
        rowElement.appendChild(cellText);
        tableBody.appendChild(rowElement);
      }
    });
}

const today = new Date().toLocaleDateString("fr-CA");

loadTimePrayTodayMtl(
  `https://api.pray.zone/v2/times/day.json?city=montreal&date=${today}`,
  document.querySelector("table")
);

/* DAY */
// loadTimePrayDayMtl(
//   "https://api.pray.zone/v2/times/day.json?city=mecca&date=2021-09-08",
//   document.querySelector("table")
// );
