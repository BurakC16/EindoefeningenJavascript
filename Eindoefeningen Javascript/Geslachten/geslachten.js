"use strict";

async function fetchData() {
  const response = await fetch('geslachten.json');
  return await response.json();
}

function toonPersonen(personen) {
  const tbody = document.getElementById('personen');
  tbody.innerHTML = ''; 

  personen.forEach(persoon => {
    const tr = document.createElement('tr');

    const tdVoornaam = document.createElement('td');
    tdVoornaam.textContent = persoon.voornaam;
    tr.appendChild(tdVoornaam);

    const tdFamilienaam = document.createElement('td');
    tdFamilienaam.textContent = persoon.familienaam;
    tr.appendChild(tdFamilienaam);

    const tdGeslacht = document.createElement('td');
    if (persoon.geslacht === 'man') {
      tdGeslacht.textContent = '♂️';
    } else if (persoon.geslacht === 'vrouw') {
      tdGeslacht.textContent = '♀️';
    } else {
      tdGeslacht.textContent = 'x';
    }
    tr.appendChild(tdGeslacht);

    const tdFoto = document.createElement('td');
    const img = document.createElement('img');
    img.src = persoon.foto;
    tdFoto.appendChild(img);
    tr.appendChild(tdFoto);

    tbody.appendChild(tr);
  });
}

function filterMannen(personen) {
  return personen.filter(p => p.geslacht === 'man');
}

function filterVrouwen(personen) {
  return personen.filter(p => p.geslacht === 'vrouw');
}

function filterX(personen) {
  return personen.filter(p => p.geslacht === 'x');
}

document.getElementById('mannen').onclick = async () => {
  const personen = await fetchData();
  toonPersonen(filterMannen(personen));
};

document.getElementById('vrouwen').onclick = async () => {
  const personen = await fetchData();
  toonPersonen(filterVrouwen(personen));
};

document.getElementById('x').onclick = async () => {
  const personen = await fetchData();
  toonPersonen(filterX(personen));
};

document.getElementById('allen').onclick = async () => {
  const personen = await fetchData();
  toonPersonen(personen);
};

window.onload = async () => {
  const personen = await fetchData();
  toonPersonen(personen);
};
