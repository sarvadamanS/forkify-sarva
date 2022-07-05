import icons from 'url:../../img/icons.svg';
import view from './view';
class searchView extends view {
  parentElement = document.querySelector('.search');
  errorMessage = 'No search results found for your query. Please try again!';
  getQuery() {
    const query = this.parentElement.querySelector('.search__field').value;
    this.clearField();
    return query;
  }
  clearField() {
    this.parentElement.querySelector('.search__field').value = '';
  }
  addhandlerRender(handler) {
    window.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
