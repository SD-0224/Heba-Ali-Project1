// DARK MODE
const toggleButton = document.getElementById("toggle-button");
const body = document.body;
// Check for saved 'darkMode' in localStorage
const darkMode = localStorage.getItem("darkMode");
if (darkMode == "true") {
  body.classList.add("dark-mode");
} else {
  body.classList.add("root");
}
toggleButton.onclick = function () {
  body.classList.toggle("dark-mode");
  // Save the behaviour to localStorage
  localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
};

// FAVIURIT
function favouritButton() {
  var favourit = document.getElementById("favourit-section");
  if (favourit.style.display === "none") {
    favourit.style.display = "block";
  } else {
    favourit.style.display = "none";
  }
}

//DEBOUCING FUNCTION
const debounce = (mainFunction, delay) => {
  // Declare a variable called 'timer' to store the timer ID
  let timer;

  // Return an anonymous function that takes in any number of arguments
  return function (...args) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer);

    // Set a new timer that will execute 'mainFunction' after the specified delay
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

//SEARCH DATA
document.getElementById("search-input").addEventListener("input", search);
function search() {
  let userInput = document.getElementById("search-input").value;
  fetch(`https://tap-web-1.herokuapp.com/topics/list?phrase=${userInput}`)
    .then((response) => response.json())
    .then((result) => {
      // i need to delete the courses box befor executing the user
      const courseBox = document.querySelectorAll(".courseBox");
      for (var i = 0; i < courseBox.length; i++) {
        console.log("i", courseBox[i]);
        courseBox[i].remove();
      }
      console.log("res", result);

      document.getElementById("loading_indicator").style.display = "block";
      const debouncedSearch = debounce(search, 3000);
      debouncedSearch();
      addContent(result);
    });
}

// CALLING THE WEBTOPICS WHEN THE USER OPEN THE HOME PAGE WHICH IS
fetch("https://tap-web-1.herokuapp.com/topics/list")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    addContent(result);
  });

function addContent(result) {
  document.getElementById("loading_indicator").style.display = "none";
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
    topic.className = "topic-container";
    topic.innerText = `${result[i].topic}`;
    courseBoxContent.appendChild(topic);

    let ratingContainer = document.createElement("div");
    ratingContainer.className = "ratings";
    courseBoxContent.appendChild(ratingContainer);

    let starOne = document.createElement("span");
    starOne.className = "star";
    ratingContainer.appendChild(starOne);

    let startwo = document.createElement("span");
    startwo.className = "star";
    ratingContainer.appendChild(startwo);

    let starThree = document.createElement("span");
    starThree.className = "star";
    ratingContainer.appendChild(starThree);

    let starfour = document.createElement("span");
    starfour.className = "star";
    ratingContainer.appendChild(starfour);

    let starfive = document.createElement("span");
    starfive.className = "star-not-checked";
    ratingContainer.appendChild(starfive);

    let autherName = document.createElement("p");
    autherName.innerText = ` Author: ${result[i].name}`;
    courseBoxContent.appendChild(autherName);
    autherName.className = "auther-name";

    container.appendChild(courseBox);
    courseBox.appendChild(courseBoxContent);
  }
}
