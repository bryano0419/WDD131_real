import recipes from "./recipes.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("form");
  const searchInput = document.querySelector("#search");
  const recipesSection = document.querySelector(".recipes");

  function createRecipeCard(recipe) {
    const article = document.createElement("article");
    article.classList.add("recipe-card");

    const recipeTop = document.createElement("div");
    recipeTop.classList.add("recipe-top");

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;

    const details = document.createElement("div");
    details.classList.add("recipe-details");

    const title = document.createElement("h2");
    title.textContent = recipe.name;

    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("rating");
    ratingSpan.setAttribute("role", "img");
    ratingSpan.setAttribute(
      "aria-label",
      `Rating: ${Math.round(recipe.rating)} out of 5 stars`
    );

    const fullStars = Math.floor(recipe.rating);
    const halfStar = recipe.rating % 1 >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      const star = document.createElement("span");
      star.setAttribute("aria-hidden", "true");
      star.textContent = "⭐";
      ratingSpan.appendChild(star);
    }
    if (halfStar) {
      const star = document.createElement("span");
      star.setAttribute("aria-hidden", "true");
      star.textContent = "⭐";
      ratingSpan.appendChild(star);
    }
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      const star = document.createElement("span");
      star.setAttribute("aria-hidden", "true");
      star.textContent = "☆";
      ratingSpan.appendChild(star);
    }

    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = recipe.description;

    details.appendChild(title);
    details.appendChild(ratingSpan);
    details.appendChild(desc);

    recipeTop.appendChild(img);
    recipeTop.appendChild(details);

    article.appendChild(recipeTop);

    return article;
  }

  function renderRecipes(recipesToRender) {
    recipesSection.innerHTML = "";
    recipesToRender.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      if (recipe.name === "Apple Crisp") {
        card.classList.add("visible");
      }

      recipesSection.appendChild(card);
    });
  }

  renderRecipes(recipes);

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();

    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );

    recipesSection.innerHTML = "";
    filteredRecipes.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      card.classList.add("visible");
      recipesSection.appendChild(card);
    });
  });
});
