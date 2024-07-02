document.getElementById('blad').onclick = (event) => startSpel('blad');
document.getElementById('steen').onclick = (event) => startSpel('steen');
document.getElementById('schaar').onclick = (event) => startSpel('schaar');


function startSpel(spelerKeuze) {
  const computerKeuze = computerKiest();
  document.getElementById('computerKeuzeSpan').innerText = computerKeuze

  if (spelerKeuze === 'blad') {
    document.getElementById('spelerKeuzeSpan').innerText = spelerKeuze 
    if (computerKeuze === 'blad') {
      document.getElementById('eindeSpel').innerText  = 'gelijkspel';
    } else if (computerKeuze === 'steen') {
      document.getElementById('eindeSpel').innerText  = 'computer wint';  
    } else if (computerKeuze === 'schaar') {
      document.getElementById('eindeSpel').innerText  = 'jij wint';
    }
  }

  if (spelerKeuze === 'steen') {
    document.getElementById('spelerKeuzeSpan').innerText = spelerKeuze 
    if (computerKeuze === 'blad') {
      document.getElementById('eindeSpel').innerText = 'computer wint';
    } else if (computerKeuze === 'steen') {
      document.getElementById('eindeSpel').innerText  = 'gelijkspel';  
    } else if (computerKeuze === 'schaar') {
      document.getElementById('eindeSpel').innerText  = 'jij wint';
    }
  }

  if (spelerKeuze === 'schaar') {
    document.getElementById('spelerKeuzeSpan').innerText = spelerKeuze 
    if (computerKeuze === 'blad') {
      document.getElementById('eindeSpel').innerText  = 'jij wint';
    } else if (computerKeuze === 'steen') {
      document.getElementById('eindeSpel').innerText  = 'computer wint';  
    } else if (computerKeuze === 'schaar') {
      document.getElementById('eindeSpel').innerText  = 'gelijkspel';
    }
  }
}

function computerKiest () {
  const keuzes = ['blad', 'steen', 'schaar'];
  const computerKeuze = Math.floor(Math.random() * keuzes.length);
  console.log(keuzes[computerKeuze]);
  return keuzes[computerKeuze]; 
}


