
import View from "./View";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _windowElement = document.querySelector('.add-recipe-window')
    _overlayElement = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
    };

    toggleWindow() {
        this._overlayElement.classList.toggle('hidden');
            this._windowElement.classList.toggle('hidden');
    };

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    };
    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlayElement.addEventListener('click', this.toggleWindow.bind(this));
    };

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const data =Object.fromEntries([...new FormData(this)]) 
            handler(data)
        })
    }

    _generateMarkup() {
       
    };
};
export default new AddRecipeView();