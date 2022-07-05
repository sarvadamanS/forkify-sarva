import { loadSearch, state } from './model.js';
import {
  loadRecipe,
  loadSearchResults,
  modifyServings,
  addBookmarkdata,
  removeBookmark,
  loadBookmarks,
  emptyBookmarks,
  uploadRecipeData,
} from './model.js';
import addrecipeview from './view/addrecipeview.js';
import recipeView from './view/recipeview.js';
import searchView from './view/searchview.js';
import resultsView from './view/resultsview.js';
import paginationView from './view/paginationview.js';
import { MODAL_CLOSE_TIMER } from './config';
// import icons from 'url:../img/icons.svg';
import 'core-js';
import 'regenerator-runtime';
import bookmarksview from './view/bookmarksview.js';
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getReciepe = async function () {
  try {
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return recipeView.clear();

    await loadRecipe(id);
    const recipe = state.recipe;
    recipeView.render(recipe);

    resultsView.update(loadSearchResults(state.search.pageNum));
    // bookmarksview.update(state.bookmarks);
    // console.log(state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.errorRender();
  }
};
const getSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return resultsView.clear();
    // console.log(query);
    await loadSearch(`${query}`);

    resultsView.render(loadSearchResults(state.search.pageNum));

    paginationView.render(state.search);
  } catch (err) {
    console.log(err.message);
    searchView.errorRender();
  }
};
const pagination = function (page) {
  state.search.pageNum = page;
  resultsView.render(loadSearchResults(state.search.pageNum));
  paginationView.render(state.search);
};
const controlServings = function (newServing) {
  modifyServings(newServing);
  recipeView.update(state.recipe);
};
const addBookmark = function () {
  if (!state.recipe.bookmarked) addBookmarkdata(state.recipe);
  else removeBookmark(state.recipe.id);
  recipeView.update(state.recipe);

  bookmarksview.render(state.bookmarksArray);
};
const bookmarkLoad = function () {
  loadBookmarks();
  if (state.bookmarksArray) bookmarksview.render(state.bookmarksArray);
};
const deleteBookmarks = function () {
  emptyBookmarks();
  bookmarksview.render(state.bookmarksArray);
  if (!state.recipe) return;
  // console.log(state.bookmarksArray);
  recipeView.update(state.recipe);
};
const controlUploadRecipe = async function (dataArr) {
  try {
    addrecipeview.renderSpinner();
    await uploadRecipeData(dataArr);
    addrecipeview.renderMessage('Succefully uploaded the recipe');
    recipeView.render(state.recipe);
    bookmarksview.render(state.bookmarksArray);
    window.history.pushState(null, '', `#${state.recipe.id}`);
    // console.log(state.recipe.id);

    setTimeout(function () {
      addrecipeview.toggleHiddenClass();
    }, MODAL_CLOSE_TIMER * 1000);
  } catch (err) {
    addrecipeview.renderMessage(err);
  }
  // const log = req.json();
  // console.log(log);
};
const innit = function () {
  console.log('Welcome to the Application');
  recipeView.addhandlerRender(getReciepe);
  recipeView.handlerServings(controlServings);
  searchView.addhandlerRender(getSearchResults);
  paginationView.addHandler(pagination);
  recipeView.bookmarkHandler(addBookmark);
  bookmarksview.addBookmarkHandler(bookmarkLoad);
  bookmarksview.clearBookmarks(deleteBookmarks);
  addrecipeview.uploadHandler(controlUploadRecipe);
};
innit();
