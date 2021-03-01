import "./styles/style.css";
document
  .querySelector(".heading-button")
  .addEventListener("click", function () {
    callHeadings();
    document.querySelector(".heading-button").replaceWith("");
  });

function callHeadings() {
  import("./common/headings.js").then((module) => {
    module.headings();
  });
}
