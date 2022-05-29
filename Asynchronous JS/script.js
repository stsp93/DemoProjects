'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
      <img class="country__img" src=${data.flags.png} />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
        <p class="country__row"><span>💰</span>${Object.entries(Object.entries(data.currencies)[0])[1][1].name}</p>
      </div>
    </article>`
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1;
}

// Using XMLHttpRequest

// function getCountry(country) {

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     xhr.send();
//     xhr.addEventListener('load', function () {
//         const [country] = JSON.parse(xhr.responseText);
//         renderCountry(country);

//         // get neighbour
//         const neighbour = country.borders[0];
//         if (!neighbour) return;

//         const xhr2 = new XMLHttpRequest();

//         xhr2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         xhr2.send();
        
//         xhr2.addEventListener('load', function() {
//             const [neighbourCountry] = JSON.parse(xhr2.responseText);
//             renderCountry(neighbourCountry, 'neighbour')
//             console.log(neighbourCountry);
//         })
//     })
// }



// Using Fetch API

const getCountryData = function(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];
    if(!neighbour) return;
    return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderCountry(data[0], 'neighbour')
    });
  
}


getCountryData('Denmark');

