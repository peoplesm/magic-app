// Variables
let picBlock = document.querySelectorAll(".carousel-item");
let picImg = document.createElement("img");

//scryfall api call gets one random card
let i = 0;
let randomCardArr = [];
function populateRandomCards() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("https://api.scryfall.com/cards/random", requestOptions)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          if (!data.image_uris) {
            randomCardArr.push(data.card_faces[0].image_uris.normal);
          } else {
            randomCardArr.push(data.image_uris.normal);
          }
          i++;
          if (i > 4) {
            setRandomCards();
          } else {
            populateRandomCards();
          }
        });
      }
    })
    //If there is an error with the call, it pushes this array of images and sets the cards (ONLY THE COOLEST GO HERE! Change if you dare...)
    .catch((error) => {
      randomCardArr = [
        "https://static.cardkingdom.com/images/magic-the-gathering/secret-lair/xenagos-god-of-revels-foil-51493.jpg",
        "https://static.cardkingdom.com/images/magic-the-gathering/double-masters-box-toppers/thoughtseize-37107.jpg",
        "https://static.cardkingdom.com/images/magic-the-gathering/double-masters-box-toppers/dark-confidant-80924.jpg",
        "https://static.cardkingdom.com/images/magic-the-gathering/promotional/judith-the-scourge-diva-prerelease-foil-50318.jpg",
        "https://static.cardkingdom.com/images/magic-the-gathering/dark-ascension/thalia-guardian-of-thraben-75912.jpg",
      ];
      console.log("error", error);
      setRandomCards();
      console.log(randomCardArr);
    });
}

//Function to set the random cards choosen by the api call. Also used by the set array if the call errors.
function setRandomCards() {
  console.log(randomCardArr);
  for (let i = 0; i < randomCardArr.length; i++) {
    if (picBlock[i].dataset.cardnum == i + 1) {
      let picImg = document.createElement("img");
      picBlock[i].append(picImg);
      picImg.setAttribute("src", randomCardArr[i]);
      picImg.classList.add("card");
      picImg.classList.add("2xm");
      picImg.classList.add("border-black");
      picImg.setAttribute("style", "border-radius: 25px; max-width:100%");
    }
  }
}

//Start the page
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    populateRandomCards();
  }
};
