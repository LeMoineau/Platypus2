
function removeAllClass(classToRemove) {

  let targets = document.querySelectorAll(`.${classToRemove}`);
  for (let t of targets) {
    t.classList.toggle(classToRemove, false);
  }

}

function makeListFromObject(objects, selector) {

  let list = [];
  for (let o of objects) {
    list.push(o[selector]);
  }
  return list;

}
