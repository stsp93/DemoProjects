'use strict'
const btnContact = document.querySelector('.btn--contact');
const modal = document.querySelector('.modal');
const container = document.querySelector('.container')
const btnSubmit = document.querySelector('.btn--submit');
btnContact.addEventListener('click', function() {
    modal.classList.toggle('hidden');    
    container.classList.toggle('blur');
        
})
btnSubmit.addEventListener('click', function() {
    modal.classList.toggle('hidden');    
    container.classList.toggle('blur');
        
})