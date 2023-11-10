let slider = document.querySelector(".slider");
let darkMoon = document.querySelector("#darkMoon");
let lightMoon = document.querySelector("#lightMoon");
let h1 = document.querySelector("h1");
let trancription = document.getElementById("trancription");
let input = document.querySelector(".searchPart input");
let meanings = document.getElementById("meanings");
let audioBtn = document.querySelector(".result-part img");
let audio = document.querySelector(".result-part audio");
let source = document.querySelector(".link a");
let notFound = document.querySelector(".not-found");
let resultPart = document.querySelector(".result-part");

slider.addEventListener("click", () => {
  document.body.classList.toggle("darkTheme");
  darkMoon.classList.toggle("none");
  lightMoon.classList.toggle("none");
});
////font//////
let Selectfont = document.querySelector(".selected-font");
let fontOption = document.querySelector(".font-options");
let fontOptions = document.querySelectorAll(".font-options span");
let fontName = document.querySelector(".font-name");

// Selectfont.addEventListener("click", () => {
//   fontOption.classList.toggle("exit");
// });

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("exit");
}

window.onclick = function (event) {
  if (!event.target.matches(".selected-font")) {
    var dropdowns = document.getElementsByClassName("font-options");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("exit")) {
        openDropdown.classList.remove("exit");
      }
    }
  }
};

for (let i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", (e) => {
    document.body.classList.remove("Mono");
    document.body.classList.remove("Sans-Serif");
    document.body.classList.remove("Serif");
    document.body.classList.add(e.target.className);
    fontOption.classList.add("exit");
    fontName.innerHTML = e.target.className;
  });
}


//////////////
function getData(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      if (data.title == "No Definitions Found") {
        resultPart.classList.add("hide");
        notFound.classList.remove("hide");
        return;
      }
      resultPart.classList.remove("hide");
      notFound.classList.add("hide");
      showUi(data[0]);
    });
}

function showUi(data) {
  source.setAttribute("href", data.sourceUrls[0]);
  source.textContent = data.sourceUrls[0];
  console.log(data);
  h1.textContent = data.word;

  let pronounceText = data.phonetics.filter(
    (el) => Boolean(el.text) != false
  )[0]?.text;

  trancription.textContent = pronounceText;

  let audioSrc = data.phonetics.filter((el) => Boolean(el.audio) != false)[0]
    ?.audio;
  trancription.style.display = pronounceText ? "block" : "none";
  audioBtn.style.display = audioSrc ? "block" : "none";

  audio.setAttribute("src", audioSrc);
  audioBtn.addEventListener("click", () => {
    audio.play();
  });
  meanings.innerHTML = "";
  for (let i = 0; i < data.meanings.length; i++) {
    let mean = data.meanings[i];
    let k = "";
    let synonyms = data.meanings[i].synonyms.join(", ");
    let antonyms = data.meanings[i].antonyms.join(", ");
    for (let j = 0; j < mean.definitions.length; j++) {
      k += "<li>" + mean.definitions[j].definition + "</li>";
    }
    let meaning = `
    <div class='meanWord'>
    <div class="meaningPart">
   <div class="part">
     <h3>${mean.partOfSpeech}</h3>
     <div></div>
   </div>
   <h2 class="meaning">Meaning</h2>
   <ul>
     ${k}
   </ul>
  </div>
   ${
     synonyms
       ? `<div class="synonyms">
     <p>Synonyms</p>
    <h5>${synonyms}</h5>
    </div> `
       : ""
   }  
  ${
    antonyms
      ? `
    <div class="synonyms">
    <p>Antonyms</p>
    <h5>${antonyms}</h5>
    </div>
    
    `
      : ""
  }
  
  `;
    meanings.innerHTML += meaning;
  }
}
getData("keyboard");

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getData(input.value);
  }
});
