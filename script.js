let slider = document.querySelector(".slider");
let darkMoon = document.querySelector("#darkMoon");
let lightMoon = document.querySelector("#lightMoon");
let h1 = document.querySelector("h1");
let input = document.querySelector("input");

////font//////
let Selectfont = document.querySelector(".selected-font");
let fontOption = document.querySelector(".font-options");
let fontName = document.querySelector(".font-name");
Selectfont.addEventListener("click", () => {
  fontOption.classList.toggle("exit");
});


slider.addEventListener("click", () => {
  document.body.classList.toggle("darkTheme");
  darkMoon.classList.toggle("none");
  lightMoon.classList.toggle("none");
});

// function getData(words) {
//   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`)
//     .then((resp) => {
//       return resp.json();
//     })
//     .then((data) => {
//       console.log(data);
//       h1.textContent = data[0].word;
//       pley.onclick = function () {
//         console.log(data[0].license.url);
//         audio.addEventListener("src", (e) => {
//           e = data[0].license.url;
//           console.log(data[0].sourceUrls);
//         });
//       };
//     });

//   input.addEventListener("keyup", (e) => {
//     if ((e.key = "Enter")) {
//       getData(h1.value);
//     }
//     console.log(e);
//   });
// }
