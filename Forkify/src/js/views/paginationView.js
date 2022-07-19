import icons from 'url:../../img/icons.svg';

import View from "./View";

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addPaginationBtnHandler(handler) {
        this._parentElement.addEventListener('click',function(e) {
            const btn = e.target.closest('button');
            if(!btn) return;

            const goToPage = +btn.dataset.page;
            handler(goToPage);
        })
    };

    _generateMarkup() {
        const resultsCount = this._data.results.length;
        const resultsPerPage = this._data.resultsPerPage;
        const currentPage = this._data.page;
        const numOfPages = Math.ceil(resultsCount / resultsPerPage);

        const generateMarkupBtn = function(page, arrow){
            const goto = page === 'next' ? currentPage + 1 : currentPage - 1
            return `<button data-page="${goto}" class="btn--inline pagination__btn--${page}">
            <span>Page ${goto}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            </button>`
        }

        //Results more than ResultsPerPage
        if (resultsCount > resultsPerPage) {
            // we are at Page  1
            if (currentPage === 1) return generateMarkupBtn('next', 'right');
            //we are at last page
            if (currentPage === numOfPages) return generateMarkupBtn('prev', 'left');
            //we are in the middle
            if (currentPage > 1) return generateMarkupBtn('prev', 'left') + generateMarkupBtn('next', 'right');

        }
        //Results less than or === to ResultsPerPage
        return ``;
    }
};
export default new PaginationView();