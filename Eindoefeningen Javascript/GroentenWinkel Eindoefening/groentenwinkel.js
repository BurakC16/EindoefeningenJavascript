"use strict";
let totaalBedrag = 0;
const mandje = {};

async function fetchData() {
  const response = await fetch('groenten.json');
  return await response.json();
}

function updateTotaal() {
  document.getElementById('totaal').textContent = totaalBedrag.toFixed(2);
}

function toonFoutmelding(bericht) {
  const foutmelding = document.getElementById('foutmelding');
  foutmelding.textContent = bericht;
  foutmelding.hidden = false;
}

function verbergFoutmelding() {
  document.getElementById('foutmelding').hidden = true;
}

function voegGroenteToeAanTabel(naam, aantal, prijs, teBetalen) {
  const tbody = document.getElementById('bestelling');

  let tr = document.getElementById(`row-${naam}`);
  if (tr) {
    const aantalTd = tr.querySelector('.aantal');
    const teBetalenTd = tr.querySelector('.te-betalen');
    aantalTd.textContent = parseInt(aantalTd.textContent) + aantal;
    teBetalenTd.textContent = (parseFloat(teBetalenTd.textContent) + teBetalen).toFixed(2);
  } else {
    tr = document.createElement('tr');
    tr.id = `row-${naam}`;
    tr.innerHTML = `
      <td>${naam}</td>
      <td class="aantal">${aantal}</td>
      <td>${prijs.toFixed(2)}</td>
      <td class="te-betalen">${teBetalen.toFixed(2)}</td>
      <td><img src="vuilbak.png" class="verwijder" data-naam="${naam}" alt="verwijder"></td>
    `;
    tbody.appendChild(tr);
  }
}

document.getElementById('toevoegen').onclick = (event) => {
  const groenteSelect = document.getElementById('groente');
  const aantalInput = document.getElementById('aantal');

  const groente = groenteSelect.value;
  const aantal = parseInt(aantalInput.value);

  if (!groente) {
    toonFoutmelding('Kies een groente.');
    return;
  }

  if (isNaN(aantal) || aantal < 1) {
    toonFoutmelding('Voer een geldig aantal in.');
    return;
  }

  verbergFoutmelding();

  const prijs = parseFloat(groenteSelect.options[groenteSelect.selectedIndex].dataset.prijs);
  const teBetalen = prijs * aantal;

  if (mandje[groente]) {
    mandje[groente].aantal += aantal;
    mandje[groente].teBetalen += teBetalen;
  } else {
    mandje[groente] = { aantal, prijs, teBetalen };
  }

  voegGroenteToeAanTabel(groente, aantal, prijs, teBetalen);

  totaalBedrag += teBetalen;
  updateTotaal();
};

document.getElementById('bestelling').onclick = (e) => {
  if (e.target.classList.contains('verwijder')) {
    const naam = e.target.dataset.naam;
    const row = document.getElementById(`row-${naam}`);
    const teBetalen = parseFloat(row.querySelector('.te-betalen').textContent);
    
    totaalBedrag -= teBetalen;
    delete mandje[naam];
    row.remove();
    updateTotaal();
  }
};

window.onload = async () => {
  const groenten = await fetchData();
  const groenteSelect = document.getElementById('groente');

  groenten.forEach(groente => {
    const option = document.createElement('option');
    option.value = groente.naam;
    option.textContent = `${groente.naam} (${groente.prijs.toFixed(2)}/${groente.eenheid})`;
    option.dataset.prijs = groente.prijs;
    groenteSelect.appendChild(option);
  });
};
