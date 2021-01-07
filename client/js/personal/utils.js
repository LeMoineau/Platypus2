
function removeAllClass(classToRemove) {

  let targets = document.querySelectorAll(`.${classToRemove}`);
  for (let t of targets) {
    t.classList.toggle(classToRemove, false);
  }

}
