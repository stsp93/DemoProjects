'use stict'

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/resultsView.js';


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

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
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
const controlPagination = function(goToPage) {
  // 1. Render results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2.Render Pagination buttons
  paginationView.render(model.state.search);
}


const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addPaginationBtnHandler(controlPagination)
}
init();
