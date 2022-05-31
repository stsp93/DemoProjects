'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
}

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
      .then(response => {
          if(!response.ok) throw new Error('No more than 1 request per second')
          return response.json();
      })
      .then(data => {
          const country = data.country;
          if(!country ) throw new Error('Cant find your location');
          return getCountryData(country);
      }).catch(err => console.log(`${err}`))
}


const renderError = function(msg) {
  countriesContainer.insertAdjacentHTML('beforeend', `<h1 class="error">Error!!! ${msg} Try Again!</h1>`);
}

const getJson = function(url, errorMsg = 'Something went wrong'){
  return fetch(url).then(response => {
    if(!response.ok) throw new Error(errorMsg, response.status);
    return response.json()
  })
}
///////////////////////////////////////


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

btn.addEventListener('click', function() {
  getCountryData(document.querySelector('.input').value);
})

const getCountryData = function(country) {
  const errMsg = document.querySelector('.error');
  if(errMsg) errMsg.remove();
  document.querySelectorAll('.country').forEach(node => node.remove());
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not Found')
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders;
      if(!neighbour) {
        console.log('Error');
        throw new Error('Country has no neighbours')
      };
    ;
    return getJson(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`, 'country not Found')
  })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    }).catch(err => {
      console.log(err);
      renderError(err.message);
    }).finally(() => countriesContainer.style.opacity = 1);
}


whereAmI(-33.933,18.474);

