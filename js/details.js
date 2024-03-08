import {
  favouritButton,
  showLoadingIndicator,
  hideLoadingIndicator,
  removeCard,
} from "./favourit.js";
import { toggleDarkMode } from "./darkmode.js";

//DARK MODE
toggleDarkMode();

// FAVIURIT
favouritButton();

// loading Indicator
showLoadingIndicator();

//rating star function
export function createRatingStars(container, numStars) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("span");
    star.className = "star" + (i < numStars - 1 ? "" : "-not-checked");
    container.appendChild(star);
  }
}

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log("id", id);
let cardData;

async function fetchTopicDetails(id) {
  try {
    if (id !== null) {
      const response = await fetch(
        `https://tap-web-1.herokuapp.com/topics/details/${id}`
      );
      if (!response.ok) {
        throw new Error(
          "Something went wrong. Web topic details failed to load."
        );
      }
      const res = await response.json();
      return res;
    }
  } catch (error) {
    console.error("Error fetching topic details:", error);
    return null;
  }
}

// Call the fetchTopicDetails function to fetch topic details
fetchTopicDetails(id).then((cardData) => {
  if (cardData) {
    console.log("cardData", cardData);
    detailsPage(cardData);
  } else {
  }
});

//add and remove to faviort
export function addRemovefaviourt(cardData) {
  let faveCard;
  //if localstorege is empty If no data is found
  if (!localStorage.getItem("MyFavourite")) {
    faveCard = [];
  } else {
    faveCard = JSON.parse(localStorage.getItem("MyFavourite"));
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
    localStorage.setItem("MyFavourite", JSON.stringify(faveCard));
    detailsButton.textContent = "Add to Favorites";
  } else {
    faveCard.push(cardData);
    localStorage.setItem("MyFavourite", JSON.stringify(faveCard));
    detailsButton.textContent = "Remove from Favorites";

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

//Details Page
export function detailsPage(cardData) {
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
