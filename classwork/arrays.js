const steps = ["one", "two", "three"];
function listTemplate(steps) {
  return `<ul id="myList"><li>${steps}</li></ul>`
}
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join();

