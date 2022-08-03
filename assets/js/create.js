let searchInputEl = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".search");
let resultsEl = document.querySelector(".search-results");
let recentAddEl = document.querySelector(".recently-added");
let saveListBtn = document.querySelector(".save-list");

function handleInput(event) {
  event.preventDefault();
  let searchInput = searchInputEl.value;
  console.log(searchInput);
  resultsEl.innerHTML = "";
  searchCard(searchInput);
  searchInputEl.value = "";
}

function searchCard(searchInput) {
  let apiUrl = `https://api.scryfall.com/cards/search?q=${searchInput}`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          console.log(data);
          for (let i = 0; i < data.data.length; i++) {
            let cardImg = document.createElement("img");
            resultsEl.append(cardImg);
            cardImg.setAttribute("src", data.data[i].image_uris.normal);
            cardImg.setAttribute(
              "style",
              "width: 150px; border-radius: 10px; z-index: 5"
            );
            cardImg.setAttribute("data-name", data.data[i].name);
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

let savedCardArr = [];
function handleCardClick(event) {
  console.log(event);
  let cardName = event.target.attributes["data-name"].nodeValue;
  let cardImg = event.target.currentSrc;
  let cardObj = {
    cardName: cardName,
    cardImg: cardImg,
  };
  savedCardArr.push(cardObj);
  let cardLi = document.createElement("li");
  recentAddEl.append(cardLi);
  cardLi.textContent = cardName;
  cardLi.classList.add("list-group-item");
  cardLi.classList.add("card-li");
  cardLi.classList.add("user-select-none");
  cardLi.setAttribute("data-mdb-toggle", "tooltip");
  cardLi.setAttribute("title", "Double Click to Remove");
  cardLi.addEventListener("dblclick", removeLi);
  console.log(savedCardArr);
}

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

function handleSave() {}

searchBtn.addEventListener("click", handleInput);
// saveListBtn.addEventListener("click", handleSave);
