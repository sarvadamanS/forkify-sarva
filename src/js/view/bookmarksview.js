import icons from 'url:../../img/icons.svg';
import previewView from './previewview';
import view from './view';
class bookmarksView extends view {
  parentElement = document.querySelector('.bookmarks__list');
  errorMessage = 'No recipes added to your bookmarks ;).';
  renderMarkup(data) {
    this._data = data;
    if (!data || data.length === 0) return this.errorRender();
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
  addBookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }
  clearBookmarks(handler) {
    const bookmark = document.querySelector('.container');
    bookmark.addEventListener('click', function (e) {
      const btn = e.target.closest('.nav__btn--clearbookmarks');
      if (!btn) return;
      handler();
    });
  }
}
export default new bookmarksView();
