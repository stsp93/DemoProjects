import previewView from './previewView';
import View from "./View";

class bookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet!';
    _message = '';

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    };

}

export default new bookmarksView();