let slider = document.querySelector(".slider");
let darkMoon = document.querySelector("#darkMoon");
let lightMoon = document.querySelector("#lightMoon");
let h1 = document.querySelector("h1");
let trancription = document.getElementById("trancription");
let input = document.querySelector(".searchPart input");
let meanings = document.getElementById("meanings");
let audioBtn = document.querySelector(".result-part img");
let audio = document.querySelector(".result-part audio");

let notFound = document.querySelector(".hide");
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

let serif = document.getElementById("serif");
let sansSerif = document.getElementById("sans-serif");
let mono = document.getElementById("mono");
Selectfont.addEventListener("click", () => {
  fontOption.classList.toggle("exit");
});

for (let i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", (e) => {
    document.body.classList.remove("Mono");
    document.body.classList.remove("Sans-Serif");
    document.body.classList.remove("Serif");
    // console.log(e.target.classList);
    document.body.classList.add(e.target.className);
    fontOption.classList.add("exit");
    fontName.innerHTML = e.target.className;
  });
  // console.log(fontOptions[i]);
}
//////////////
function getData(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      showUi(data[0]);
    });
}

function showUi(data) {
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
  
  <div class="synonyms">
   <p>Synonyms</p>
   <h5>${data.meanings[i].synonyms}</h5>
  </div>
  </div>
  `;
    meanings.innerHTML += meaning;
  }
}

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getData(input.value);
  }
});
