import view from './view';
class addrecipeview extends view {
  errorMessage = 'Error adding the recipe , please check the inputs!';
  parentElement = document.querySelector('.upload');
  addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  RecipeWindow = document.querySelector('.add-recipe-window');
  closeWindow = document.querySelector('.btn--close-modal');
  overlay = document.querySelector('.overlay');
  markup = ``;
  constructor() {
    super();
    this.addRecipeHandler();
    this.closeRecipeHandler();
    this.markup = this.parentElement.innerHTML;
  }
  toggleHiddenClass() {
    // console.log('test');
    // console.log(this.markup);
    this.generateMarkup();
    this.RecipeWindow.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }
  addRecipeHandler() {
    // this.generateMarkup();
    this.addRecipeBtn.addEventListener(
      'click',
      this.toggleHiddenClass.bind(this)
    );
  }
  closeRecipeHandler() {
    this.closeWindow.addEventListener(
      'click',
      this.toggleHiddenClass.bind(this)
    );
    this.overlay.addEventListener('click', this.toggleHiddenClass.bind(this));
  }
  generateMarkup() {
    this.parentElement.innerHTML = this.markup;
  }
  uploadHandler(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //   console.log(this);
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new addrecipeview();
