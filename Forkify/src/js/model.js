import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search:{
        query:'',
        results:[],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
    },
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
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
        console.log(data);
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
}

