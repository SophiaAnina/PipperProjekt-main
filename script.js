

function myModalProfil() {
  var x = document.getElementById("myWrapperProfil");
  if (x.className === "wrapperProfil") {
    x.className += "responsive";
  } else {
    x.className = "wrapperProfil";
  }
}


function myModalMeddelelser() {
  var x = document.getElementById("myWrapperMeddelelser");
  if (x.className === "wrapperMeddelelser") {
    x.className += "responsive";
  } else {
    x.className = "wrapperMeddelelser";
  }
}
// Search

document.getElementById("searchInput").addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();

  // Filter pips based on Brugernavn
  const filteredPips = pips.filter(pip => pip.Brugernavn.toLowerCase().includes(searchQuery));

  // Display filtered results
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
let pips = [];  // Declare globally

window.addEventListener("load", async () => {
    const url = "http://localhost:8000/pipper";
    const response = await fetch(url);
    pips = await response.json();  // Store globally
    
    // Initial display
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

// C indsæt

document.getElementById("pipperForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const Brugernavn = document.getElementById("Brugernavn").value;
  const Besked = document.getElementById("Besked").value;
  const Avatar = document.getElementById("avatar").value;
  
  const data = {
      Brugernavn: Brugernavn,
      Besked: Besked,
    
      Dato: new Date().toISOString().slice(0,19)
  };

  console.log(data);

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
  
  console.log(pipper);
  console.log("yayy det virker!");

})
window.addEventListener("load", async (event) => {
  const url = "http://localhost:8000/pipper";
const  response = await fetch(url)
const pips = await response.json();
console.log(pips)

// Get the element where you want to display the pips object
  const displayElement = document.getElementById("pipperResult");
 
  // Convert the pips object to a string and display it
  displayElement.innerText = JSON.stringify(pips);
 
  // Create seperate html classes for Brugernavn and Besked
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

