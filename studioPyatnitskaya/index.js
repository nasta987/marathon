document.addEventListener("DOMContentLoaded", function () {
  const upButton = document.querySelector(".up-button");
  const downButton = document.querySelector(".down-button");
  const sidebar = document.querySelector(".sidebar");
  const mainSlide = document.querySelector(".main-slide");
  const container = document.querySelector(".container");
  const slideCount = mainSlide.querySelectorAll("div").length;
  let activeSlideIndex = 0;
  let startY = 0;
  let endY = 0;

  sidebar.style.top = `-${(slideCount - 1) * 100}vh`;

  upButton.addEventListener("click", () => {
    changeSlide("up");
  });

  downButton.addEventListener("click", () => {
    changeSlide("down");
  });

  window.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      changeSlide("up");
    } else {
      changeSlide("down");
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      changeSlide("up");
    } else if (event.key === "ArrowDown") {
      changeSlide("down");
    }
  });

  container.addEventListener("touchstart", function (event) {
    startY = event.touches[0].clientY;
  });

  container.addEventListener("touchmove", function (event) {
    endY = event.touches[0].clientY;
  });

  container.addEventListener("touchend", function () {
    if (startY > endY) {
      changeSlide("up");
    } else if (startY < endY) {
      changeSlide("down");
    }
  });

  function changeSlide(direction) {
    if (direction === "up") {
      activeSlideIndex++;
      if (activeSlideIndex === slideCount) {
        activeSlideIndex = 0;
      }
    } else if (direction === "down") {
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        activeSlideIndex = slideCount - 1;
      }
    }
    const height = container.clientHeight;
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
  }
});
