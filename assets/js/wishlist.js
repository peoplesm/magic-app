let arrCardWishlist = [];
let cardWishlistEl = document.getElementById("cards-id");
let formArr = [];

let gifyURL =
  "https://api.giphy.com/v1/gifs/search?api_key=nP9BkrRS5LsHhVROKIrah4GzQ3R1k7PV&q=";
let gifSearch = document.querySelector(".gif-search");
let gif = document.querySelector(".gif");
let formInfo = document.querySelector(".form-values");
let wishName = document.querySelector(".name");
let wishDate = document.querySelector(".date");
let wishComment = document.querySelector(".comment");
let submitBtn = document.querySelector(".send");
let date = document.createElement("p");
let gifSection = document.querySelector(".gif-section");
let comment = document.createElement("p");
let listName = document.createElement("p");

function getGIF(deckObject) {
  let gifyAPI =
    gifyURL + gifSearch.value.trim() + "&limit=1&offset=0&rating=pg&lang=en";
  fetch(gifyAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(response);
        let gifAttach = data.data[0].images.original.url;
        deckObject.formGif = gifAttach;
        formArr.push(deckObject);
        localStorage.setItem("form", JSON.stringify(formArr));
        let addGif = document.createElement("img");
        addGif.setAttribute("src", gifAttach);
        addGif.classList.add("gifClass");
        gifSection.append(addGif);
      });
    }
  }); //add a catch or an empty string formGif
}

function formSubmission() {
  if (localStorage.getItem("form")) {
    formArr = [];
  }
  gifSection.innerHTML = "";
  deck = {
    formName: wishName.value.trim(),
    formDate: wishDate.value.trim(),
    formComment: wishComment.value,
  };
  getGIF(deck);
  listName.innerHTML = `Deck Name: <br>${formArr[0].formName}`;
  comment.innerHTML = `Comment: <br>${formArr[0].formComment}`;
  date.innerHTML = `Date: <br>${formArr[0].formDate}`;

  formInfo.append(listName);
  formInfo.append(date);
  formInfo.append(comment);
}

// displaying cards on wishlist
function displayCardz() {
  console.log(arrCardWishlist);
  for (let index = 0; index < arrCardWishlist.length; index++) {
    let cardImage = arrCardWishlist[index].cardImg;
    let cardImageEl = document.createElement("img");
    cardImageEl.setAttribute("src", cardImage);
    cardWishlistEl.append(cardImageEl);
  }
}

function renderForm() {
  console.log(formArr);
  listName.innerHTML = `Deck Name: <br>${formArr[0].formName}`;
  comment.innerHTML = `Comment: <br>${formArr[0].formComment}`;
  date.innerHTML = `Date: <br>${formArr[0].formDate}`;

  formInfo.append(listName);
  formInfo.append(date);
  formInfo.append(comment);
  let addGif = document.createElement("img");
  addGif.setAttribute("src", formArr[0].formGif);
  addGif.classList.add("gifClass");
  gifSection.append(addGif);
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formSubmission();
});

document.onreadystatechange = function () {
  document.onreadystatechange = function () {
    if (localStorage.getItem("deck")) {
      arrCardWishlist = JSON.parse(localStorage.getItem("deck"));
      // put an else here that pops a modole thing saying to go create a deck
      displayCardz();
    }
    if (localStorage.getItem("form")) {
      formArr = JSON.parse(localStorage.getItem("form"));
      renderForm();
    }
  };
};
