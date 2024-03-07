import { favouritButton } from "./favourit.js";
import { createRatingStars } from "./details.js";
import { toggleDarkMode } from "./darkmode.js";
import { showLoadingIndicator } from "./favourit.js";
import { hideLoadingIndicator } from "./favourit.js";

let contentData = [];

// FAVIURIT
favouritButton();
// DARK MODE
toggleDarkMode();

// CALLING THE WEBTOPICS WHEN THE USER OPEN THE HOME PAGE
console.log("prefetch");
fetch("https://tap-web-1.herokuapp.com/topics/list")
  .then(async (response) => {
    // console.log(await response.text());
    return response.json();
  })
  .then((result) => {
    console.log("infetch");
    contentData = result;
    // console.log(result);
    addContent(result);
  });

// function fetchWebTopics() {
//   fetch("https://tap-web-1.herokuapp.com/topics/list")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Something went wrong. Web topics failed to load.");
//       }
//       return response.json();
//     })
//     .then((result) => {
//       contentData = result;
//       addContent(result);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }
// fetchWebTopics();

//DEBOUCING FUNCTION
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
const debounceDelay = 300;

//SEARCH DATA
function searchContent() {
  let userInput = document.getElementById("search-input").value;
  fetch(`https://tap-web-1.herokuapp.com/topics/list?phrase=${userInput}`)
    .then((response) => response.json())
    .then((result) => {
      //delete the courses box befor executing the user
      const courseBox = document.querySelectorAll(".courseBox");
      for (let i = 0; i < courseBox.length; i++) {
        courseBox[i].remove();
      }
      document.getElementById("loading_indicator").style.display = "block";
      // showLoadingIndicator();
      addContent(result);
    });
}
const debouncedHandleSearch = debounce(searchContent, debounceDelay);
document
  .getElementById("search-input")
  .addEventListener("input", debouncedHandleSearch);

//sort
document.getElementById("sort").addEventListener("change", sortBy);
function sortBy() {
  // console.log("Sort function called");
  // console.log("contentData", contentData);
  let userSortSelect = document.getElementById("sort").value;

  contentData.sort(function (a, b) {
    switch (userSortSelect) {
      case "Topic":
        console.log("Sorting by topic");
        if (a.topic < b.topic) {
          return -1;
        }
        if (a.topic > b.topic) {
          return 1;
        }
        break;
      case "Author":
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        break;
      default:
        return 0;
    }
  });
  const courseBox = document.querySelectorAll(".courseBox");
  for (let i = 0; i < courseBox.length; i++) {
    courseBox[i].remove();
  }
  addContent(contentData);
}

//filter
document.getElementById("filter").addEventListener("change", filterBy);
function filterBy() {
  let userFillterSelect = document.getElementById("filter").value;

  let filterdCategory = contentData.filter(
    (course) => course.category === userFillterSelect
  );
  console.log("contentData", userFillterSelect, filterdCategory);
  const courseBox = document.querySelectorAll(".courseBox");
  for (let i = 0; i < courseBox.length; i++) {
    courseBox[i].remove();
  }
  addContent(filterdCategory);
}

function addContent(result) {
  document.getElementById("loading_indicator").style.display = "none";
  // hideLoadingIndicator();
  const container = document.querySelector(".courses-container");
  for (let i = 0; i < result.length; i++) {
    let courseBox = document.createElement("div");
    courseBox.className = "courseBox";

    let img = document.createElement("img");
    img.src = `./logos/${result[i].image}`;
    img.className = "courses-img";
    courseBox.appendChild(img);

    let courseBoxContent = document.createElement("div");
    courseBoxContent.className = "course-Box-Content-container";

    let category = document.createElement("p");
    category.className = "category-container";
    category.innerText = `${result[i].category}`;
    courseBoxContent.appendChild(category);

    let topic = document.createElement("h4");
    topic.addEventListener("click", function handleClick(event) {
      const id = topic.className.split("-")[1];
      console.log("sis", id);
      window.location = `details.html?id=${id}`;
    });
    // topic.className = "topic-container";
    topic.className = `topic-${result[i].id}`;
    topic.innerText = `${result[i].topic}`;
    courseBoxContent.appendChild(topic);

    let ratingContainer = document.createElement("div");
    ratingContainer.className = "rating";
    courseBoxContent.appendChild(ratingContainer);
    createRatingStars(ratingContainer, 5);

    let autherName = document.createElement("p");
    autherName.innerText = ` Author: ${result[i].name}`;
    courseBoxContent.appendChild(autherName);
    autherName.className = "auther-name";

    container.appendChild(courseBox);
    courseBox.appendChild(courseBoxContent);
  }
}
