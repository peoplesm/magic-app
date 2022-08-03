let gifyURL =
  "https://api.giphy.com/v1/gifs/search?api_key=nP9BkrRS5LsHhVROKIrah4GzQ3R1k7PV&q=";
let gifSearch = document.querySelector(".gif-search");
let comment = document.querySelector(".comment");
let gif = document.querySelector(".gif");
let formInfo = document.querySelector(".form-info");

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
        formInfo.append(addGif);
      });
    }
  });
}
gif.addEventListener("click", function () {
  getGIF();
});
