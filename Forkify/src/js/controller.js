'use stict'

import * as model from './model.js';
import recipeView from './views/recipeView.js';


import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');



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

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// Non repetitive event listener
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
}
init();
