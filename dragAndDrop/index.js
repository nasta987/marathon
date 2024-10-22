document.addEventListener("DOMContentLoaded", function () {
  const item = document.querySelector(".item");
  const placeholders = document.querySelectorAll(".placeholder");

  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);

  function dragStart(event) {
    event.target.classList.add("hold");
    setTimeout(() => event.target.classList.add("hide"), 0);
  }
  function dragEnd(event) {
    event.target.classList.remove("hold");
    event.target.classList.remove("hide");
  }
});
