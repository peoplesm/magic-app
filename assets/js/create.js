let searchInputEl = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".search");
let resultsEl = document.querySelector(".search-results");
let recentAddEl = document.querySelector(".recently-added");

function handleInput(event) {
  event.preventDefault();
  let searchInput = searchInputEl.value;
  console.log(searchInput);
  resultsEl.innerHTML = "";
  searchCard(searchInput);
  searchInputEl.value = "";
}

searchBtn.addEventListener("click", handleInput);

function searchCard(searchInput) {
  let apiUrl = `https://api.scryfall.com/cards/search?q=${searchInput}`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
          let cardImg = document.createElement("img");
          resultsEl.append(cardImg);
          cardImg.setAttribute("src", data.data[i].image_uris.normal);
          cardImg.setAttribute("style", "width: 150px; border-radius: 10px");
          cardImg.setAttribute("data-name", data.data[i].name);
          cardImg.classList.add("card-result-img");
          cardImg.addEventListener("click", handleCardClick);
        }
      });
    }
  });
}

function handleCardClick(event) {
  console.log(event.target.attributes["data-name"].nodeValue);
  let cardName = event.target.attributes["data-name"].nodeValue;
  let cardLi = document.createElement("li");
  recentAddEl.append(cardLi);
  cardLi.textContent = cardName;
  cardLi.classList.add("list-group-item");
  cardLi.classList.add("card-li");
}
