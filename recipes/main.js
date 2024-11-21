import recipes from './recipes.mjs';

function generateStars(rating) {
  const fullStars = '⭐'.repeat(Math.floor(rating));
  const emptyStars = '☆'.repeat(5 - Math.floor(rating));
  return `${fullStars}${emptyStars}`;
}

function recipeTemplate(recipe) {
  return `
    <article>
      <h2>${recipe.name}</h2>
      <p><strong>Tags:</strong> ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}</p>
      <img src="${recipe.image}" alt="${recipe.name}" style="max-width:100%; height:auto;">
      <p><strong>Rating:</strong> <span>${generateStars(recipe.rating)}</span></p>
      <p><strong>Author:</strong> ${recipe.author}</p>
      <p><strong>Description:</strong> ${recipe.description}</p>
    </article>
  `;
}

function displayRandomRecipe() {
  const mainElement = document.querySelector('main');
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  mainElement.innerHTML = recipeTemplate(randomRecipe);
}

document.addEventListener('DOMContentLoaded', displayRandomRecipe);
