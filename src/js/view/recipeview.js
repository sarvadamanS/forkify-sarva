import icons from 'url:../../img/icons.svg';
import view from './view';
import 'fracty';
import fracty from 'fracty';
class recipeView extends view {
  parentElement = document.querySelector('.recipe');
  errorMessage = 'No recipes found for your query. Please try again!';

  renderMarkup(recipe) {
    return `
    <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-servings="${
          recipe.servings - 1
        }" >
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-servings="${
          recipe.servings + 1
        }" >
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${recipe.key ? '' : 'hidden'}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._ingredients(recipe.ingredients)}
      

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.source}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _ingredients(ings) {
    // console.log(`test`);
    return ings
      .map(ing => {
        return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity"> ${
      ing.quantity ? fracty(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit"> ${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
      })
      .join();
  }

  addhandlerRender(handler) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }
  handlerServings(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      // console.log(btn);

      // if (+btn.dataset.servings === 0) return;

      // handler(+btn.dataset.servings);
      const { servings } = btn.dataset;
      if (+servings > 0) handler(+servings);
    });
  }
  bookmarkHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
}
export default new recipeView();
