const voornamen = {};

document.getElementById("toevoegenButton").onclick = (event) => {
  const voornaamInput = document.getElementById("voornaamInput");
  const voornaam = voornaamInput.value;
  if (voornaam === "") return;

  if (voornamen[voornaam]) {
    voornamen[voornaam]++;
  } else {
    voornamen[voornaam] = 1;
  }

  const lijst = document.getElementById("lijst");
  lijst.innerHTML = '';
  for (const [naam, aantal] of Object.entries(voornamen)) {
    const li = document.createElement("li");
    li.textContent = `${naam}: ${aantal}`;
    lijst.appendChild(li);
  }

  voornaamInput.value = "";
  voornaamInput.focus();
};
