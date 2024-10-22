document.addEventListener("DOMContentLoaded", function () {
  const item = document.querySelector(".item");
  const placeholders = document.querySelectorAll(".placeholder");

  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  item.addEventListener("touchstart", touchStart);
  item.addEventListener("touchmove", touchMove);
  item.addEventListener("touchend", touchEnd);

  for (const placeholder of placeholders) {
    placeholder.addEventListener("dragover", dragover); // элемент находится над плэйсхолдером, куда мы можем поместить
    placeholder.addEventListener("dragenter", dragenter); // элемент заходит на территорию конкретного плэйсхолдера
    placeholder.addEventListener("dragleave", dragleave); //элемент вышел с территории плэйсхолдера
    placeholder.addEventListener("drop", drop); // когда мы отпустили элемент
  }

  function dragStart(event) {
    event.target.classList.add("hold");
    setTimeout(() => event.target.classList.add("hide"), 0);
  }
  function dragEnd(event) {
    event.target.classList.remove("hold");
    event.target.classList.remove("hide");
  }
  function dragover(event) {
    event.preventDefault(); // по умолчанию dragover запрещает перетаскивание и мы с помощью preventDefault отменяем запрет на перемещение
  }
  function dragenter(event) {
    event.target.classList.add("hovered");
  }
  function dragleave(event) {
    event.target.classList.remove("hovered");
  }
  function drop(event) {
    // элемент не будет перетаскиваться без функции dragover
    event.target.append(item); // добавить элемент на плэйсхолдер (event.target = class = plaiceholder)
    event.target.classList.remove("hovered");
  }
  function touchStart(event) {
    event.preventDefault();
    dragStart(event.touches[0]);
  }

  function touchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.pageX, touch.pageY);
    if (target && target.classList.contains("placeholder")) {
      item.style.position = "absolute";
      item.style.left = `${touch.pageX}px`;
      item.style.top = `${touch.pageY}px`;
    }
  }

  function touchEnd(event) {
    event.preventDefault();
    dragEnd(event.changedTouches[0]);
    const touch = event.changedTouches[0];
    const target = document.elementFromPoint(touch.pageX, touch.pageY);
    if (target && target.classList.contains("placeholder")) {
      target.append(item);
    }
  }
});
