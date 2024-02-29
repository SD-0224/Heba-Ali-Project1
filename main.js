// // import {  } from "module";

// const toggleButton = document.getElementById("toggle-button");
// const body = document.body;

// // saved 'darkMode' in localStorage
// const darkMode = localStorage.getItem("darkMode");

// if (darkMode == "true") {
//   body.classList.add("dark-mode");
// } else {
//   body.classList.add("root");
// }

// toggleButton.onclick = function () {
//   body.classList.toggle("dark-mode");

//   // Save the behaviour to localStorage
//   localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
// };

// export const favouritButton = () => {

//   var favourit = document.getElementById("favourit-section");
//   if (favourit.style.display === "none") {
//     favourit.style.display = "block";
//   } else {
//     favourit.style.display = "none";
//   }

// //   localStorage.setItem("favourit-section", ) heba edit
// };

// // const container = document.querySelector(".courses-container")

// fetch("https://tap-web-1.herokuapp.com/topics/list")
//   .then((response) => response.json())
//   .then((result) => {
//     document.getElementById("loading_indicator").style.display = "none";
//     console.log(result);
//     const container = document.querySelector(".courses-container");
//     for (let i = 0; i < result.length; i++) {
//       let courseBox = document.createElement("div");
//       courseBox.className = "courseBox";

//       let img = document.createElement("img");
//       img.src = `./logos/${result[i].image}`;
//       img.className = "courses-img";
//       courseBox.appendChild(img);

//       let courseBoxContent = document.createElement("div");
//       courseBoxContent.className = "course-Box-Content-container";

//       let category = document.createElement("p");
//       category.className = "category-container";
//       category.innerText = `${result[i].category}`;
//       courseBoxContent.appendChild(category);

//       let topic = document.createElement("h4");
//       topic.className = "topic-container";
//       topic.innerText = `${result[i].topic}`;
//       courseBoxContent.appendChild(topic);

//       let ratingContainer = document.createElement("div");
//       ratingContainer.className = "ratings";
//       courseBoxContent.appendChild(ratingContainer);

//       let starOne = document.createElement("span");
//       starOne.className = "star";
//       ratingContainer.appendChild(starOne);

//       let startwo = document.createElement("span");
//       startwo.className = "star";
//       ratingContainer.appendChild(startwo);

//       let starThree = document.createElement("span");
//       starThree.className = "star";
//       ratingContainer.appendChild(starThree);

//       let starfour = document.createElement("span");
//       starfour.className = "star";
//       ratingContainer.appendChild(starfour);

//       let starfive = document.createElement("span");
//       starfive.className = "star-not-checked";
//       ratingContainer.appendChild(starfive);

//       let autherName = document.createElement("p");
//       autherName.innerText = ` Author: ${result[i].name}`;
//       courseBoxContent.appendChild(autherName);
//       autherName.className = "auther-name";

//       container.appendChild(courseBox);
//       courseBox.appendChild(courseBoxContent);
//     }
//   });
