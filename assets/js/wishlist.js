let cardWishlist = document.querySelector(".container");

let gifyURL =
  "https://api.giphy.com/v1/gifs/search?api_key=nP9BkrRS5LsHhVROKIrah4GzQ3R1k7PV&q=";
let gifSearch = document.querySelector(".gif-search");
let gif = document.querySelector(".gif");
let formInfo = document.querySelector(".name-date");
let wishName = document.querySelector(".name");
let wishDate = document.querySelector(".date");
let wishComment = document.querySelector(".comment");
let submitBtn = document.querySelector(".send");
let date = document.createElement("p");
// let comment = document.createElement("p");
let gifSection = document.querySelector(".gif-section");
let comment = document.querySelector(".comment-section");

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
        gifSection.append(addGif);
      });
    }
  });
}

function formSubmission() {
  formInfo.textContent = wishName.value.trim();
  date.textContent = wishDate.value.trim();
  comment.textContent = wishComment.value;

  formInfo.append(date);
  // date.append(comment);

  return;
}

//event listeners:
gif.addEventListener("click", function () {
  getGIF();
});

// displaying cards on wishlist

function displayCards() {
  cardWishlist.innerHTML = localStorage.getItem("placeholder-value");
}

displayCards();

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formSubmission();
});
