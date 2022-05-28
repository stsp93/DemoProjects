'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function getCountry(country) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    xhr.send();
    xhr.addEventListener('load', function () {
        const [countryObj] = JSON.parse(xhr.responseText);
        const html = `
        <article class="country">
          <img class="country__img" src=${countryObj.flags.png} />
          <div class="country__data">
            <h3 class="country__name">${countryObj.name.common}</h3>
            <h4 class="country__region">${countryObj.region}</h4>
            <p class="country__row"><span>👫</span>${(countryObj.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${Object.entries(countryObj.languages)[0][1]}</p>
            <p class="country__row"><span>💰</span>${Object.entries(Object.entries(countryObj.currencies)[0])[1][1].name}</p>
          </div>
        </article>`
        countriesContainer.insertAdjacentHTML('afterbegin', html)
        countriesContainer.style.opacity = 1;
    })
}

getCountry('Bulgaria');
getCountry('Romania');
getCountry('greece');
getCountry('Madagascar')