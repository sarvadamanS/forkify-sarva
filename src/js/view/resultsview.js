import icons from 'url:../../img/icons.svg';
import previewView from './previewview';
import view from './view';
class resultsView extends view {
  parentElement = document.querySelector('.results');
  errorMessage = 'No recipes found for your query. Please try again!';
  renderMarkup(data) {
    this._data = data;
    // console.log(this._data);
    return this._data.map(el => this.Markup(el)).join('');
  }
  Markup(search) {
    const idHash = window.location.hash.slice(1);
    // console.log(idHash);

    return `<li class="preview">
    <a class="preview__link ${
      search.id === idHash ? 'preview__link--active' : ''
    }" href="#${search.id}">
      <figure class="preview__fig">
        <img src="${search.image}" alt="${search.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${search.title}</h4>
        <p class="preview__publisher">${search.publisher}</p>
        <div class="preview__user-generated ${search.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}
export default new resultsView();
