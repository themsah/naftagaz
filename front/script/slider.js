const sliderThreeBtn = document.querySelectorAll(".company-pressCenter_btn--style");
const sliderNews = document.querySelector("#news");
const sliderMedia = document.querySelector("#media");
const sliderEvents = document.querySelector("#Events");
const nextBtn = document.querySelector(".company-pressCenter_slider--nextBtn");
const prevBtn = document.querySelector(".company-pressCenter_slider--prevBtn");
const sliderDetails = document.querySelectorAll(".company-pressCenter_detail"); 
let currentTranslateX = 0;
const step = 500; 

const maxTranslateXConfig = {
    news: 1750, 
    media: 1100, 
    Events: 1100 
}
let currentMaxTranslateX = maxTranslateXConfig.news; 
function updateButtonStates() {
  if (currentTranslateX === 0) {
    prevBtn.classList.remove("active");
  } else {
    prevBtn.classList.add("active");
  }
  if (currentTranslateX >= currentMaxTranslateX) {
    nextBtn.classList.remove("active");
  } else {
    nextBtn.classList.add("active");
  }
}
updateButtonStates();
sliderThreeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    sliderThreeBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    item.classList.add("active");
    const dataShow = item.dataset.show;
    sliderDetails.forEach(detail => {
      detail.style.opacity = "0";
      detail.style.display = "none";
    });
    switch (dataShow) {
      case "news":
        sliderNews.style.opacity = "1";
        sliderNews.style.display = "flex"; 
        currentMaxTranslateX = maxTranslateXConfig.news;
        break;
      case "media":
        sliderMedia.style.opacity = "1";
        sliderMedia.style.display = "flex"; 
        currentMaxTranslateX = maxTranslateXConfig.media;
        break;
      case "Events":
        sliderEvents.style.opacity = "1";
        sliderEvents.style.display = "flex"; 
        currentMaxTranslateX = maxTranslateXConfig.Events;
        break;
      default:
        sliderNews.style.opacity = "1";
        sliderNews.style.display = "flex"; 
        currentMaxTranslateX = maxTranslateXConfig.news;
        break;
    }
    currentTranslateX = 0;
    sliderDetails.forEach((detail) => {
        detail.style.transform = `translateX(-${currentTranslateX}px)`;
    });
    updateButtonStates();
  });
});
nextBtn.addEventListener("click", () => {
  if (currentTranslateX < currentMaxTranslateX) {
    currentTranslateX += step;
    if (currentTranslateX > currentMaxTranslateX) {
      currentTranslateX = currentMaxTranslateX;
    }
    sliderDetails.forEach((item) => {
      item.style.transform = `translateX(${currentTranslateX}px)`; 
    });
    updateButtonStates();
  }
});
prevBtn.addEventListener("click", () => {
  if (currentTranslateX > 0) {
    currentTranslateX -= step;
    if (currentTranslateX < 0) {
      currentTranslateX = 0;
    }
    sliderDetails.forEach((item) => {
      item.style.transform = `translateX(${currentTranslateX}px)`; 
    });
    updateButtonStates();
  }
});