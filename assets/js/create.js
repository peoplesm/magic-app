let searchInputEl = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".search");
let resultsEl = document.querySelector(".search-results");
let recentAddEl = document.querySelector(".recently-added");
let saveListBtn = document.querySelector(".save-list");
let nameListBtn = document.querySelector(".name-list");
let clearListBtn = document.querySelector(".clear-list");

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
            if (!data.data[i].image_uris) {
              cardImg.setAttribute(
                "src",
                data.data[i].card_faces[0].image_uris.normal
              );
            } else {
              cardImg.setAttribute("src", data.data[i].image_uris.normal);
            }

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
  let i = savedCardArr.indexOf(cardObj);
  recentAddEl.append(buildCard(i));

  console.log(cardObj);
  console.log(savedCardArr);
}

function buildCard(i) {
  let cardLi = document.createElement("li");
  cardLi.textContent = savedCardArr[i].cardName;
  cardLi.classList.add("list-group-item", "card-li", "user-select-none");
  cardLi.setAttribute("data-mdb-toggle", "tooltip");
  cardLi.setAttribute("title", "Double Click to Remove");
  cardLi.addEventListener("dblclick", removeLi);
  return cardLi;
}

function buildList() {
  savedCardArr = JSON.parse(localStorage.getItem("deck"));
  for (let i = 0; i < savedCardArr.length; i++) {
    let cardLi = buildCard(i);
    recentAddEl.append(cardLi);
  }
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

function handleSave() {
  localStorage.setItem("deck", JSON.stringify(savedCardArr));
}

function handleName() {
  handleSave();
  location.href = "./wishlist.html";
}

function handleClear() {
  while (recentAddEl.firstChild) {
    recentAddEl.removeChild(recentAddEl.firstChild);
  }
  savedCardArr = [];
  localStorage.setItem("deck", JSON.stringify(savedCardArr));
  console.log(savedCardArr);
}

searchBtn.addEventListener("click", handleInput);
saveListBtn.addEventListener("click", handleSave);
nameListBtn.addEventListener("click", handleName);
clearListBtn.addEventListener("click", handleClear);

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    if (localStorage.getItem("deck")) {
      buildList();
    }
  }
};
