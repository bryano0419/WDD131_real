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

    // Container for extended details, initially hidden
    const extendedDetails = document.createElement("div");
    extendedDetails.classList.add("extended-details");
    extendedDetails.style.display = "none";
    extendedDetails.style.marginTop = "1rem";

    // Prep time and cook time
    const times = document.createElement("p");
    times.innerHTML = `<strong>Prep Time:</strong> ${recipe.prepTime || "N/A"} | <strong>Cook Time:</strong> ${recipe.cookTime || "N/A"}`;
    extendedDetails.appendChild(times);

    // Yield
    if (recipe.recipeYield) {
      const yieldP = document.createElement("p");
      yieldP.innerHTML = `<strong>Yield:</strong> ${recipe.recipeYield}`;
      extendedDetails.appendChild(yieldP);
    }

    // Author
    if (recipe.author) {
      const authorP = document.createElement("p");
      authorP.innerHTML = `<strong>Author:</strong> ${recipe.author}`;
      extendedDetails.appendChild(authorP);
    }

    // Ingredients list
    if (recipe.recipeIngredient && recipe.recipeIngredient.length > 0) {
      const ingredientsTitle = document.createElement("h3");
      ingredientsTitle.textContent = "Ingredients:";
      extendedDetails.appendChild(ingredientsTitle);

      const ulIngredients = document.createElement("ul");
      recipe.recipeIngredient.forEach((ing) => {
        const li = document.createElement("li");
        li.textContent = ing;
        ulIngredients.appendChild(li);
      });
      extendedDetails.appendChild(ulIngredients);
    }

    // Instructions list
    if (recipe.recipeInstructions && recipe.recipeInstructions.length > 0) {
      const instructionsTitle = document.createElement("h3");
      instructionsTitle.textContent = "Instructions:";
      extendedDetails.appendChild(instructionsTitle);

      const olInstructions = document.createElement("ol");
      recipe.recipeInstructions.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        olInstructions.appendChild(li);
      });
      extendedDetails.appendChild(olInstructions);
    }

    // Show More / Show Less button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Show More";
    toggleButton.style.marginTop = "1rem";
    toggleButton.style.padding = "0.5rem 1rem";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.backgroundColor = "#ea6a47";
    toggleButton.style.color = "#fff";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "6px";
    toggleButton.style.fontSize = "1rem";
    toggleButton.style.transition = "background-color 0.3s ease";

    toggleButton.addEventListener("mouseenter", () => {
      toggleButton.style.backgroundColor = "#d2573a";
    });
    toggleButton.addEventListener("mouseleave", () => {
      toggleButton.style.backgroundColor = "#ea6a47";
    });

    toggleButton.addEventListener("click", () => {
      if (extendedDetails.style.display === "none") {
        extendedDetails.style.display = "block";
        toggleButton.textContent = "Show Less";
      } else {
        extendedDetails.style.display = "none";
        toggleButton.textContent = "Show More";
      }
    });

    details.appendChild(title);
    details.appendChild(ratingSpan);
    details.appendChild(desc);
    details.appendChild(toggleButton);
    details.appendChild(extendedDetails);

    recipeTop.appendChild(img);
    recipeTop.appendChild(details);

    article.appendChild(recipeTop);

    return article;
  }

  function renderRecipes(recipesToRender) {
    recipesSection.innerHTML = "";
    recipesToRender.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      card.classList.add("visible");
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

    if (filteredRecipes.length === 0) {
      recipesSection.innerHTML = "<p style='text-align:center; margin-top:2rem; font-size:1.25rem; color:#ea6a47;'>No recipes found. Please try a different search.</p>";
    } else {
      renderRecipes(filteredRecipes);
    }
  });
});





