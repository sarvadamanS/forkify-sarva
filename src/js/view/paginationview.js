import icons from 'url:../../img/icons.svg';
import view from './view';

class paginationView extends view {
  parentElement = document.querySelector('.pagination');
  errorMessage = 'No recipes found for your query. Please try again!';

  renderMarkup(data) {
    const totalPage = Math.ceil(data.searchResults / data.resultsperPage);
    let currPage = data.pageNum;
    if (totalPage > 1 && currPage === totalPage) {
      return `<button class="btn--inline pagination__btn--prev" data-page="${
        totalPage - 1
      }" >
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${totalPage - 1}</span>
        </button>
        `;
    }
    if (totalPage > 1 && currPage === 1) {
      return ` <div class="page--number--display pagination">
      <span> <p>Total pages: ${totalPage}</p> </span>
  </div>
    <button class="btn--inline pagination__btn--next" data-page="${
      currPage + 1
    }">
          <span>Page${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    if (totalPage > 1 && currPage > 1 && currPage < totalPage) {
      return `<div class="page--number--display pagination">
      <span> <p>Total pages: ${totalPage}</p> </span>
  </div>
  <button class="btn--inline pagination__btn--prev" data-page="${
    currPage - 1
  }" >
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page${currPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next"  data-page="${
          currPage + 1
        }" >
        <span>Page${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
        `;
    }
  }
  addHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      //   console.log(e.target);
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.page);
    });
  }
}
export default new paginationView();
