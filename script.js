// Søgefelt 
document.getElementById("searchInput").addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();

  // Filterer pips efter søgning
  const filteredPips = pips.filter(pip => pip.Brugernavn.toLowerCase().includes(searchQuery));

  // og Viser resultaterne der matcher
  const displayElement = document.getElementById("pipperResult");
  const htmlPipList = filteredPips.map(pip => {
      return `
      <div class="pip">
        <p class="brugernavn">${pip.Brugernavn}</p>
        <p class="besked">${pip.Besked}</p>
        <p class="dato">${pip.Dato}</p>
        <img class="avatar" src="${pip.Avatar}"><img>
      </div>
      `;
  }).join("");
  displayElement.innerHTML = htmlPipList;
});

//Deklarering af pips
let pips = [];  
//Tilføjer data til databasen 
window.addEventListener("load", async () => {
    const url = "http://localhost:8000/pipper";
    const response = await fetch(url);
    pips = await response.json();  
    
    // Viser alle pips i en liste og giver dem en klasse
    const displayElement = document.getElementById("pipperResult");
    const htmlPipList = pips.map(pip => {
        return `
        <div class="pip">
          <p class="brugernavn">${pip.Brugernavn}</p>
          <p class="besked">${pip.Besked}</p>
          <img class="avatar" src="${pip.Avatar}"><img>
          <p class="dato">${pip.Dato}</p>
        </div>
        `;
    }).join("");
    displayElement.innerHTML = htmlPipList;
});

// Anslag
const beskedInput = document.getElementById('Besked');
const counter = document.getElementById('counter');
const maxLength = 255;

// Går igennem hvad brugeren skriver dynamisk i Beskedfeltet
beskedInput.addEventListener('input', function() {
  let characterCount = beskedInput.value.length;

  // Updatere antal anslag skrevet på skærmen.
  counter.textContent = 'Characters: ' + characterCount + '/' + maxLength;

  // Gør teksten rød hvis brugeren overskrider antallet af anslag.
  if (characterCount >= maxLength) {
    counter.classList.add('over-limit');
  } else {
    counter.classList.remove('over-limit');
  }
});

//Synkronisere data med databasen 
document.getElementById("pipperForm").addEventListener("submit", async (event) => {
  event.preventDefault();
//Omdanner id til konstanter i databasen
  const Brugernavn = document.getElementById("Brugernavn").value;
  const Besked = document.getElementById("Besked").value;
  const Avatar = document.querySelector("input[name='avatar']:checked").value;
  //Samler konstanter i et objekt kaldet data
  const data = {
      Brugernavn: Brugernavn,
      Besked: Besked,
      Avatar: Avatar,
      Dato: new Date().toISOString().slice(0,19)
  };
  //Logger data i konsollen
  console.log(data);
//Opretter forbindelse til Postman og Poster data i databasen
  const url = "http://localhost:8000/pipper";
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  };
  
  const response = await fetch(url, options)
  const pipper = await response.json();
  //Logger data i konsollen
  console.log(pipper);
  console.log("yayy det virker!");
  //Genindlæser siden
window.location.reload();
})
//Forbinder med Postman og henter data fra databasen
window.addEventListener("load", async (event) => {
  const url = "http://localhost:8000/pipper";
const  response = await fetch(url)
const pips = await response.json();
console.log(pips)

// Indsætter data i Id'et pipperResult
  const displayElement = document.getElementById("pipperResult");
 
  // Konventere pipper til en string
  displayElement.innerText = JSON.stringify(pips);
 
  // Konventere pipper html klasser 
  const htmlPipList = pips.map(pip => {
    return `
    <div class="pip">
      <p class="brugernavn">${pip.Brugernavn}</p>
      <p class="besked">${pip.Besked}</p>
      <p class="dato">${pip.Dato}</p>
      <img class="avatar" src="${pip.Avatar}"><img>
    </div>
    `
  }).join("");
  displayElement.innerHTML = htmlPipList;
});

