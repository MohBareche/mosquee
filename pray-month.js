/* MONTH */
function loadTimePrayMonthMtl(url, table) {
  const tableHead = table.querySelector('thead')
  const tableBody = table.querySelector('tbody')
  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then(async (data) => {
      const prieres = await data.results.datetime

      /* Clear the table */
      tableHead.innerHTML = '<tr></tr>'
      tableBody.innerHTML = ''

      /* Populate the headers */
      let titres = []

      titres = Object.keys(prieres[0].date)
      titres.shift()
      let titres_pray = Object.keys(prieres[0].times)
      for (let i in titres_pray) {
        titres.push(titres_pray[i])
      }

      for (let titre of titres) {
        const headerElement = document.createElement('th')
        headerElement.textContent = titre
        tableHead.querySelector('tr').appendChild(headerElement)
      }

      /* Populate the row */

      for (let i in prieres) {
        let dates = Object.values(prieres[i].date)
        dates.shift()
        let heures = Object.values(prieres[i].times)
        let donnees = dates.concat(heures)

        const rowElement = document.createElement('tr')
        rowElement.setAttribute('class', 'day')
        const today = new Date().toLocaleDateString('fr-CA')

        for (let donnee of donnees) {
          const cellText = document.createElement('td')
          cellText.textContent = donnee
          rowElement.appendChild(cellText)
          tableBody.appendChild(rowElement)
        }

        const rows = document.querySelectorAll('.day')
        rows.forEach((row) => {
          if (donnees[0] === today) {
            removeActiveId()
            row.setAttribute('id', 'active')
          }
        })

        function removeActiveId() {
          rows.forEach((row) => {
            row.removeAttribute('id', 'active')
          })
        }
      }
    })

  // Color background today
}

loadTimePrayMonthMtl(
  'https://api.pray.zone/v2/times/this_month.json?city=montreal',
  document.querySelector('table')
)
