import { favouritButton } from "./favourit.js";
import { toggleDarkMode } from "./darkmode.js";
import { showLoadingIndicator } from "./favourit.js";
import { hideLoadingIndicator } from "./favourit.js";

export function createRatingStars(container, numStars) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("span");
    star.className = "star" + (i < numStars - 1 ? "" : "-not-checked");
    container.appendChild(star);
  }
}

//DARK MODE
toggleDarkMode();

// FAVIURIT
favouritButton();

// loading Indicator
showLoadingIndicator();

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log("id", id);
let cardData;

fetch(`https://tap-web-1.herokuapp.com/topics/details/${id}`)
  .then((response) => response.json())
  .then((result) => {
    //let cardData = result
    cardData = result;

    detailsPage(cardData);
    console.log("id", id);
  });

// async function fetchTopicDetails(id) {
//   try {
//     const response = await fetch(
//       `https://tap-web-1.herokuapp.com/topics/details/${id}`
//     );
//     if (!response.ok) {
//       throw new Error(
//         "Something went wrong. Web topic details failed to load."
//       );
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {
//     console.error("Error fetching topic details:", error);
//     return null;
//   }
// }

// // Call the fetchTopicDetails function to fetch topic details
// fetchTopicDetails(id).then((cardData) => {
//   if (cardData) {
//     console.log(cardData);
//     // You can call any function that depends on topicDetails, such as detailsPage
//     detailsPage(cardData);
//   } else {
//   }
// });

// function fetchTopicDetails(id) {
//   let params = new URLSearchParams(document.location.search);
//   let id = params.get("id");
//   console.log("idheba", id);
//   fetch(`https://tap-web-1.herokuapp.com/topics/details/${id}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           "Something went wrong. Web topic details failed to load."
//         );
//       }
//       return response.json();
//     })
//     .then((result) => {
//       cardData = result;
//       detailsPage(cardData);
//     })
//     .catch((error) => {
//       console.error("Error fetching topic details:", error);
//     });
// }
// fetchTopicDetails();

export function removeCard(faveCard, id) {
  const elmWithIdIndex = faveCard.findIndex((elm) => elm.id === id);

  if (elmWithIdIndex > -1) {
    faveCard.splice(elmWithIdIndex, 1);
  }

  return faveCard;
}

//add and remove to faviort function
export function addRemovefaviourt(cardData) {
  let faveCard;
  //if localstorege is empty If no data is found
  if (!localStorage.getItem("MyFaviorit")) {
    //i need the faveCard variabele as empty array
    faveCard = [];
    //  else if the localstorege is not empty put the MyFaviorit item in the faveCard
  } else {
    faveCard = JSON.parse(localStorage.getItem("MyFaviorit"));
  }
  //search if the card is in the array "by id"
  let isFavioutr = faveCard.filter((elm) => elm.id === cardData.id);
  console.log("isFavioutr", isFavioutr);
  let detailsButton = document.getElementById("remove-button");
  if (isFavioutr.length > 0) {
    //remove the card
    let cardId = document.getElementById(`id-${isFavioutr[0].id}`);

    cardId.remove();
    removeCard(faveCard, cardData.id);
    localStorage.setItem("MyFaviorit", JSON.stringify(faveCard));
    detailsButton.textContent = "Add to Favorites";
  } else {
    faveCard.push(cardData);
    localStorage.setItem("MyFaviorit", JSON.stringify(faveCard));
    detailsButton.textContent = "Remove from Favorites";
    // add the html structure for the cards and change the result or the var allfavcard be sure with the name to cardData
    let faviouritCourses = document.querySelector(".faviourit-courses");

    let faviouritCourse = document.createElement("div");
    faviouritCourse.className = "container";
    faviouritCourse.id = `id-${cardData.id}`;
    faviouritCourse.className = "faviourit-course";
    faviouritCourses.appendChild(faviouritCourse);

    let favImg = document.createElement("img");
    favImg.className = "faviourit-course-img";
    favImg.src = `./logos/${cardData.image}`;
    faviouritCourse.appendChild(favImg);

    let favTopic = document.createElement("h1");
    favTopic.className = "course-title";
    favTopic.innerText = `${cardData.topic}`;
    faviouritCourse.appendChild(favTopic);

    let faviouritRatings = document.createElement("div");
    faviouritRatings.className = "rating";
    faviouritCourse.appendChild(faviouritRatings);
    createRatingStars(faviouritRatings, 5);
  }
}

export function detailsPage(cardData) {
  // document.getElementById("loading_indicator").style.display = "none";
  hideLoadingIndicator();
  const main = document.querySelector(".main");

  let detailsBox = document.createElement("div");
  detailsBox.className = "details-box";
  main.appendChild(detailsBox);

  let detailsContent = document.createElement("div");
  detailsContent.className = "details-content";
  detailsContent.className = "container-details";
  detailsBox.appendChild(detailsContent);

  let category = document.createElement("p");
  category.className = "category";
  category.innerText = `${cardData.category}`;
  detailsContent.appendChild(category);

  let topic = document.createElement("h1");
  topic.className = "topic";
  topic.innerText = `${cardData.topic}`;
  detailsContent.appendChild(topic);

  let rating = document.createElement("div");
  rating.className = "rating";
  detailsContent.appendChild(rating);
  createRatingStars(rating, 5); // Create 5 stars

  let description = document.createElement("p");
  description.className = "description ";
  description.innerText = `${cardData.description}`;
  detailsContent.appendChild(description);

  let asideBoxRaber = document.createElement("div");
  asideBoxRaber.className = "aside-boxraber";
  main.appendChild(asideBoxRaber);

  let asideBox = document.createElement("div");
  asideBox.className = "aside-box";
  asideBoxRaber.appendChild(asideBox);

  let img = document.createElement("img");
  img.src = `./logos/${cardData.image}`;
  img.className = "details-image";
  asideBox.appendChild(img);

  let auther = document.createElement("p");
  auther.innerText = ` by: ${cardData.name}`;
  auther.className = "auother";
  asideBox.appendChild(auther);

  let asideBoxTopic = document.createElement("span");
  asideBoxTopic.className = "bolded";
  asideBoxTopic.innerText = `${cardData.topic}`;
  auther.appendChild(asideBoxTopic);

  let asideSmallBox = document.createElement("div");
  asideSmallBox.className = "aside-small-box";
  asideBox.appendChild(asideSmallBox);

  let intrestedPag = document.createElement("p");
  intrestedPag.innerHTML = "Intrested about this topic?";
  intrestedPag.className = "intrested-pag";
  asideSmallBox.appendChild(intrestedPag);

  let detailsButton = document.createElement("button");
  detailsButton.addEventListener("click", function addToFaviourt(event) {
    addRemovefaviourt(cardData);
  });
  detailsButton.id = "remove-button";
  detailsButton.innerHTML = "ADD To Faviourt";
  detailsButton.className = "add-to-favorites";
  asideSmallBox.appendChild(detailsButton);

  let unlimitedParag = document.createElement("p");
  unlimitedParag.innerHTML = "Unlimited Credits";
  unlimitedParag.className = "unlimited-parag";
  asideSmallBox.appendChild(unlimitedParag);

  let section = document.createElement("section");
  section.className = "section";
  main.appendChild(section);

  let subtopicsBox = document.createElement("div");
  subtopicsBox.className = "subtopics-box container-details ";
  section.appendChild(subtopicsBox);

  let subtopicsHead = document.createElement("li");
  subtopicsHead.className = "subtopics-head";
  subtopicsHead.innerText = `${cardData.topic} SUB TOPICS `;
  subtopicsBox.appendChild(subtopicsHead);

  // const subtopicsLength = cardData.subtopics.length;
  for (let i = 0; i < cardData.subtopics.length; i++) {
    let subtopic = document.createElement("li");
    subtopic.className = "subtopic";
    subtopic.innerText = `${cardData.subtopics[i]}`;
    subtopicsBox.appendChild(subtopic);

    let circleChecked = document.createElement("span");
    circleChecked.className = "circle-checked";
    subtopic.appendChild(circleChecked);
  }
}
