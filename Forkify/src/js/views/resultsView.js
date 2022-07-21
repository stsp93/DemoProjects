import View from "./View";
import previewView from "./previewView";

class resultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No Recipes Found! Try Again!';
    _message = '';

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('')
    };
}

export default new resultView();