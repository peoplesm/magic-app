let searchInputEl = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".search");
let resultsEl = document.querySelector(".search-results");

function handleInput(event) {
  event.preventDefault();
  let searchInput = searchInputEl.value;
  console.log(searchInput);
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
          console.log("hello");
          let card = document.createElement("li");
          let cardImg = document.createElement("img");
          resultsEl.append(card);
          card.append(cardImg);
          cardImg.setAttribute("src", data.data[i].image_uris.normal);
        }
      });
    }
  });
}
