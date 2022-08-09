//Variables
let searchInputEl = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".search");
let resultsEl = document.querySelector(".search-results");
let recentAddEl = document.querySelector(".recently-added");
let saveListBtn = document.querySelector(".save-list");
let nameListBtn = document.querySelector(".name-list");
let clearListBtn = document.querySelector(".clear-list");
let savedCardArr = [];

//Function called when user clicks search
function handleInput(event) {
  event.preventDefault();
  let searchInput = searchInputEl.value;
  console.log(searchInput);
  resultsEl.innerHTML = "";
  searchCard(searchInput);
  searchInputEl.value = "";
}

//API call based on user's input. Initiated by the handleInput fxn
function searchCard(searchInput) {
  let apiUrl = `https://api.scryfall.com/cards/search?q=${searchInput}`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          console.log(data);
          //Logic for listing the card images that get returned.
          for (let i = 0; i < data.data.length; i++) {
            let cardImg = document.createElement("img");
            resultsEl.append(cardImg);
            if (!data.data[i].image_uris) {
              cardImg.setAttribute(
                "src",
                data.data[i].card_faces[0].image_uris.normal
              );
            } else {
              cardImg.setAttribute("src", data.data[i].image_uris.normal);
            }
            cardImg.setAttribute("data-name", data.data[i].name);
            cardImg.setAttribute("data-price", data.data[i].prices.usd);
            cardImg.classList.add("card-result-img");
            cardImg.addEventListener("click", handleCardClick);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  });
}

//Building the deck based on user clicks on the generated card list.
function handleCardClick(event) {
  console.log(event);
  let cardName = event.target.attributes["data-name"].nodeValue;
  let cardImg = event.target.currentSrc;
  let cardPrice = event.target.attributes["data-price"].nodeValue;
  let cardObj = {
    cardName: cardName,
    cardImg: cardImg,
    cardPrice: cardPrice,
  };
  savedCardArr.push(cardObj);
  let i = savedCardArr.indexOf(cardObj);
  recentAddEl.append(buildCard(i));

  console.log(cardObj);
  console.log(savedCardArr);
}

//Make the individual card li
function buildCard(i) {
  let cardLi = document.createElement("li");
  cardLi.textContent = savedCardArr[i].cardName;
  cardLi.classList.add("list-group-item", "card-li", "user-select-none");
  cardLi.setAttribute("data-mdb-toggle", "tooltip");
  cardLi.setAttribute("title", "Double Click to Remove");
  cardLi.addEventListener("dblclick", removeLi);
  return cardLi;
}

//Rendering last known list from localStorage
function buildList() {
  savedCardArr = JSON.parse(localStorage.getItem("deck"));
  for (let i = 0; i < savedCardArr.length; i++) {
    let cardLi = buildCard(i);
    recentAddEl.append(cardLi);
  }
}

//Finds corresponding card in array based on user dblclick
function removeLi(event) {
  console.log(event);
  let cardLi = event.target;
  let targetCardName = event.target.innerText;
  console.log(targetCardName);

  let cardIndex = savedCardArr
    .map((cardName) => cardName.cardName)
    .indexOf(`${targetCardName}`);
  console.log(cardIndex);
  savedCardArr.splice(cardIndex, 1);
  cardLi.remove();
  console.log(savedCardArr);
}

//Save deck to localStorage
function handleSave() {
  localStorage.setItem("deck", JSON.stringify(savedCardArr));
}

//Saves deck and goes to wishlist page when name btn is clicked
function handleName() {
  handleSave();
  location.href = "./wishlist.html";
}

//Clears the current saved deck
function handleClear() {
  while (recentAddEl.firstChild) {
    recentAddEl.removeChild(recentAddEl.firstChild);
  }
  savedCardArr = [];
  formArr = [];

  localStorage.setItem("form", JSON.stringify(formArr));
  localStorage.setItem("deck", JSON.stringify(savedCardArr));
  console.log(savedCardArr);
}

searchBtn.addEventListener("click", handleInput);
saveListBtn.addEventListener("click", handleSave);
nameListBtn.addEventListener("click", handleName);
clearListBtn.addEventListener("click", handleClear);

//Start the page
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    if (localStorage.getItem("deck")) {
      buildList();
    }
  }
};
