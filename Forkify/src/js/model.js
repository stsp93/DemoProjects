import { API_URL, KEY, RESULTS_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
    },
    bookmarks: [],
};


const createRecipe = function (data) {
    const { recipe } = data.data;
     return state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
    };
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        state.recipe = createRecipe(data)

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }
    } catch (err) {
        console.error(`${err} 💣💣💣`);
        throw err;
    }
};

export const loadSearchResult = async function (query) {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        });
        state.search.page = 1;
    } catch (err) {
        console.error(`${err} 💣💣💣`);
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    let start = (page - 1) * RESULTS_PER_PAGE;
    let end = page * RESULTS_PER_PAGE;

    return state.search.results.slice(start, end)
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = newServings;
};

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
};


export const addBookmark = function (recipe) {
    //Add bookmark
    state.bookmarks.push(recipe);

    //Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
};

export const removeBookmark = function (id) {
    const index = state.bookmarks.find(el => el.id === id);
    state.bookmarks.splice(index, 1);
    //Mark current recipe as not a bookmark
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
};

// Clear bookmarks (During Dev)
const clearBookmarks = function () {
    localStorage.clear();
};
// clearBookmarks();

const init = function () {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks) state.bookmarks = JSON.parse(bookmarks)
}
init();


export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe).filter(entries => entries[0].startsWith('ingredient') && entries[1] !== '').map(ing => {
            const ingArr = ing[1].replace(/' '/g, '').split(',');
            if (ingArr.length !== 3) throw new Error('Invalid ingredients format.Please fill with correct format 🙂');
            const [quntity, unit, description] = ingArr;
            return { quntity: quntity ? +quntity : null, unit, description }
        });
        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.imageUrl,
            servings: +newRecipe.servings,
            cooking_time: +newRecipe.cookingTime,
            ingredients,
        }
        console.log(recipe);
        const data = await sendJSON(`${API_URL}?=key${KEY}`, recipe);
        state.recipe = createRecipe(data);
        addBookmark(state.recipe);
        console.log(data);
    } catch (err) {
        throw err;
    }
}