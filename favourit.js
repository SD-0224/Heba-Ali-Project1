import { createRatingStars } from "./details.js";

document
  .getElementById("headerButtons")
  .addEventListener("click", favouritButton);
export function favouritButton() {
  const allFaveCards = JSON.parse(localStorage.getItem("MyFaviorit")) || [];
  let faviouritCourses = document.querySelector(".faviourit-courses");
  let faviourtCourse = document.querySelectorAll(".faviourit-course");

  if (faviouritCourses && faviouritCourses.children) {
    for (let i = 0; i < faviourtCourse.length; i++) {
      faviourtCourse[i].remove();
    }
  }

  let favourit = document.getElementById("favourit");
  if (favourit.style.display === "none") {
    favourit.style.display = "block";

    let faviouritCourses = document.querySelector(".faviourit-courses");
    for (let i = 0; i < allFaveCards.length; i++) {
      let faviouritCourse = document.createElement("div");
      faviouritCourse.className = "container";
      faviouritCourse.id = `id-${allFaveCards[i].id}`;
      faviouritCourse.className = "faviourit-course";
      faviouritCourses.appendChild(faviouritCourse);

      let favImg = document.createElement("img");
      favImg.className = "faviourit-course-img";
      favImg.src = `./logos/${allFaveCards[i].image}`;
      faviouritCourse.appendChild(favImg);

      let favTopic = document.createElement("h1");
      favTopic.className = "course-title";
      favTopic.innerText = `${allFaveCards[i].topic}`;
      faviouritCourse.appendChild(favTopic);

      let faviouritRatings = document.createElement("div");
      faviouritRatings.className = "rating";
      faviouritCourse.appendChild(faviouritRatings);
      createRatingStars(faviouritRatings, 5);
    }
  } else {
    favourit.style.display = "none";
  }
}

export function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading_indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "block";
  }
}
showLoadingIndicator();

export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading_indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}
hideLoadingIndicator();
