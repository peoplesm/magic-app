let arrCardWishlist = [];
let cardWishlistEl = document.getElementById("cards-id");
let formArr =[];

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
// let comment = document.createElement("p");
let gifSection = document.querySelector(".gif-section");
let comment = document.createElement("p");
let listName = document.createElement("p");

function getGIF() {
  let gifyAPI =
    gifyURL + gifSearch.value.trim() + "&limit=1&offset=0&rating=pg&lang=en";
  fetch(gifyAPI).then(function (response) {
    fetch(gifyAPI);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(response);
        let gifAttach = data.data[0].images.original.url;
        // let addGif = document.innerHTML= '<img src =  "'+ gifAttach +'" title="GIF">';
        let addGif = document.createElement("img");
        addGif.setAttribute("src", gifAttach);
        addGif.classList.add("gifClass");
        gifSection.append(addGif);
      });
    }
  });
}

function formSubmission() {
  deckObject= {
    formName: wishName.value.trim(),
    formDate: wishDate.value.trim(),
    formComment: wishComment.value,
    formGif: getGIF(),
    cards: displayCardz()
  };
  // formInfo.textContent = wishName.value.trim();
  // date.textContent = wishDate.value.trim();
  // comment.textContent = wishComment.value;

  // formInfo.append(date);
  // date.append(comment);
  localStorage.setItem("form-info", JSON.stringify(deckObject));

  JSON.parse(localStorage.getItem("form-info"));
  listName.textContent = deckObject.formName;
  comment.textContent = deckObject.formComment;
  date.textContent = deckObject.formDate;

  formInfo.append(listName);
  formInfo.append(date);
  formInfo.append(comment)
  


  return;
}

//event listeners:
// gif.addEventListener("click", function () {
 
// });

// displaying cards on wishlist
function displayCardz() {
  arrCardWishlist = JSON.parse(localStorage.getItem("deck"));
  console.log(arrCardWishlist);
  for (let index = 0; index < arrCardWishlist.length; index++) {
    var cardImage = arrCardWishlist[index].cardImg;
    var cardImageEl = document.createElement("img");
    cardImageEl.setAttribute("src", cardImage);
    cardWishlistEl.append(cardImageEl);
  }
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formSubmission();
  // displayCardz();
  // getGIF();
});


