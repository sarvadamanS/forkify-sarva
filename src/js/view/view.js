import icons from 'url:../../img/icons.svg';
export default class view {
  _data = '';
  render(data) {
    this.clear();
    const html = this.renderMarkup(data);
    this.parentElement.insertAdjacentHTML('beforeend', html);
  }
  clear() {
    this.parentElement.innerHTML = '';
  }
  renderSpinner() {
    this.clear();
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message) {
    this.clear();
    const markup = `<div class="message">
  <div>
    <svg>
      <use href="src/img/icons.svg#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  errorRender(message = this.errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    const newMarkup = this.renderMarkup(data);
    const curElements = this.parentElement.querySelectorAll('*');
    const newDomElement = document
      .createRange()
      .createContextualFragment(newMarkup);
    // console.log(newDomElement);
    const newElement = newDomElement.querySelectorAll('*');
    // console.log(newElement);
    newElement.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );

      // console.log(newEl.firstChild.nodeValue.trim());
    });
  }
}
