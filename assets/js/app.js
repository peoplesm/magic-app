let mtgURL = "http://api.magicthegathering.io/v1/";

const slides = document.querySelectorAll(".slider");

// loop through slides and set each slides translateX property to index * 100% 

function getImg(){
  let cardURL = mtgURL + "card";

  fetch(cardURL)
  .then(function(response){
    if(response.ok)
    {response().json().then(function(data){
      for (let indx = 0; indx < response.length; indx++) {
        const element = response[i];
        
      }
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
      });
      
      // current slide counter    
      let curSlide = 0;
      
      // select next slide button
      const nextSlide = document.querySelector(".btn-next");
      
      // add event listener and next slide functionality
      nextSlide.addEventListener("click", function () {
           curSlide++;
      
        slides.forEach((slides, indx) => {
          slides.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
      });
      // select prev slide button
      const prevSlide = document.querySelector(".btn-prev");
      
      // add event listener and navigation functionality
      prevSlide.addEventListener("click", function () {
        // check if current slide is the first and reset current slide to last
        if (curSlide === 0) {
          curSlide = maxSlide;
        } else {
          curSlide--;
        }
      
        //   move slide by 100%
        slides.forEach((slides, indx) => {
          slides.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
      });
      }
    )}
}
)
}   


