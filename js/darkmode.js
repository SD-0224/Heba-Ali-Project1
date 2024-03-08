export function toggleDarkMode() {
  const modeIconMoon = document.getElementById("mode-icon");
  const toggleButton = document.getElementById("toggle-button");
  const body = document.body;

  // Check for saved 'darkMode' in localStorage
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode == "true") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "Light Mode";
  } else {
    body.classList.add("root");
    toggleButton.textContent = "Dark Mode";
  }

  toggleButton.onclick = function () {
    body.classList.toggle("dark-mode");
    // Save to localStorage
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
    toggleButton.textContent = body.classList.contains("dark-mode")
      ? "Light Mode"
      : "Dark Mode";
  };
}

toggleDarkMode();
