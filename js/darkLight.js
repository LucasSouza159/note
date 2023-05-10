const toggleTheme = document.getElementById("toggle");

toggleTheme.addEventListener("click", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
  if (document.body.classList.contains("dark")) {
    toggleTheme.style.color = "#000";
  } else {
    toggleTheme.style.color = "#FFF";
  }
});
