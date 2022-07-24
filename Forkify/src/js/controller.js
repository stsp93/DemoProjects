'use stict'

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/resultsView.js';
import addRecipeView from './views/addRecipeView.js';
import {MODAL_CLOSE_SECONDS} from './config'


import 'core-js/stable';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept()
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //Update Results View
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Get search Query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // 2. Loading Results
    await model.loadSearchResult(query);
    // 3. Render results
    resultsView.render(model.getSearchResultsPage());
    // 4.Render Pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  // 1. Render results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2.Render Pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  //Render recipe with updated servings
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //2. Update Recipe view
  recipeView.update(model.state.recipe);

  // 3.Render bookmarks
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try{
    //0.Spinner render
    addRecipeView.renderSpinner();
    
    //1.Upload Recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //2.Render recipe
    recipeView.render(model.state.recipe)
    //3.Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SECONDS * 1000)
  } catch (err){
    console.error(err); 
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addPaginationBtnHandler(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
