let mtgURL = "https://api.magicthegathering.io/v1/cards";
const slides = document.querySelectorAll(".slider");
const twitterFeedEl = document.querySelector(".twitterfeed");
let gifyURL = "https://api.giphy.com/v1/gifs/random?api_key=nP9BkrRS5LsHhVROKIrah4GzQ3R1k7PV&tag="
let gifSearch = document.querySelector(".gif-search");
let comment = document.querySelector(".comment");
let gif = document.querySelector(".gif");
let formInfo = document.querySelector(".form-info")
let picBlock = document.querySelector(".carousel-item");
let picImg = document.createElement("img");

// loop through slides and set each slides translateX property to index * 100%

function getImg() {
  fetch(mtgURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        for (let indx = 0; indx < 5; indx++) {
          // console.log(data.cards[indx].imageUrl)
          let element =
            data.cards[Math.floor(Math.random() * data.cards.length)].imageUrl;

          if (element == undefined) {
            // || duplicates){
            indx--;
          }
          console.log(element);
          // console.log(data.cards[0].imageUrl)
          //       slides.forEach((slides, indx) => {
          //         slides.style.transform = `translateX(${indx * 100}%)`;
          //       });

          //       // current slide counter
          //       let curSlide = 0;

          //       // select next slide button
          //       const nextSlide = document.querySelector(".btn-next");

          //       // add event listener and next slide functionality
          //       nextSlide.addEventListener("click", function () {
          //            curSlide++;

          //         slides.forEach((slides, indx) => {
          //           slides.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
          //         });
          //       });
          //       // select prev slide button
          //       const prevSlide = document.querySelector(".btn-prev");

          //       // add event listener and navigation functionality
          //       prevSlide.addEventListener("click", function () {
          //         // check if current slide is the first and reset current slide to last
          //         if (curSlide === 0) {
          //           curSlide = maxSlide;
          //         } else {
          //           curSlide--;
          //         }

          //         //   move slide by 100%
          //         slides.forEach((slides, indx) => {
          //           slides.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
          //         });
          // });
        }
      });
    }
  });
}

getImg();

//scryfall gets one random card

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
          randomCardArr.push(data.image_uris.normal);
          i++;
          if (i > 4) {
            setRandomCards();
          } else {
            populateRandomCards();
          }
        });
      }
    })
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

function setRandomCards() {
  console.log(randomCardArr);
  for (let i = 0; i < randomCardArr.length; i++) {
    if (picBlock.dataset.cardnum == i + 1) {
      let picImg = document.createElement("img");
      picBlock.append(picImg);
      picImg.setAttribute("src", randomCardArr[i]);
    }
  }
}

populateRandomCards();

//TWITTER API STUFF
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer AAAAAAAAAAAAAAAAAAAAAJ%2FkfQEAAAAAsijk2%2FqD01hIznPHxl54WMbes9Y%3DyiGEVXAmkyFhgUCf7LsE4nh5X0RMPde4Ao5eZtPWGd4oXgyBc5"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// fetch(
//   "https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=from:wizards_magic&tweet.fields=created_at&max_results=10",
//   requestOptions
// ).then(function (response) {
//   if (response.ok) {
//     response.json().then(function (data) {
//       console.log(data);
//       let tweetEl = document.createElement("p");
//       twitterFeedEl.append(tweetEl);
//       tweetEl.innerText = data.data[0].text;
//     });
//   }
// });

// https://api.twitter.com/2/tweets/search/recent?query=from:wizards_magic&tweet.fields=created_at&max_results=10

function getGIF(){
  fetch(gifyURL) 
  .then(function (response) {
    let gifyAPI = gifyURL + gifSearch.value.trim() + "&rating=pg";
    console.log(gifSearch.value)
    fetch(gifyAPI)
    if(response.ok){
    response.json().then(function (data) {
      console.log(data.data.images.downsized_small.mp4);
      let gifAttach = data.data.images.downsized_small.mp4;
      let addGif = document.innerHTML= "<img src=" + gifAttach + ">";
      formInfo.append(addGif);
    })
    }

  })

}
gif.addEventListener("click",function(){
  getGIF();  
})