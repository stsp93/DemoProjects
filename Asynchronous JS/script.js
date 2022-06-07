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
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(

    //   position => {
    //     // console.log(position);
    //     return resolve(position)},
    //   err => {
    //     return reject(err)})
    //   ;
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;
//     return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//   }).then(response => {
//     if (!response.ok) throw new Error('No more than 1 request per second')
//     return response.json();
//   })
//     .then(data => {
//       const country = data.country;
//       console.log(`You are in ${data.city}, ${data.country}`);
//       if (!country) throw new Error('Cant find your location');
//       return getCountryData(country);
//     }).catch(err => console.log(`${err}`))
// }


const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', `<h1 class="error">${msg} Try Again!</h1>`);
  countriesContainer.style.opacity = 1;
};

const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json()
  })
};
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

// btn.addEventListener('click', whereAmI)

// const getCountryData = function (country) {
//   const errMsg = document.querySelector('.error');
//   if (errMsg) errMsg.remove();
//   document.querySelectorAll('.country').forEach(node => node.remove());
//   getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not Found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       if (!neighbour) {
//         console.log('Error');
//         throw new Error('Country has no neighbours')
//       };
//       ;
//       return getJson(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`, 'country not Found')
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     }).catch(err => {
//       console.log(err);
//       renderError(err.message);
//     }).finally(() => countriesContainer.style.opacity = 1);
// }


// Creating a Promise

// const lottery = new Promise(function(resolve, reject) {
//   if(Math.random() > 0.5){
//     resolve('You win 🏆')
//   } else {
//     reject(new Error('You lost 💣'))
//   }
// });

// lottery.then(res => console.log(res))
// .catch(err => console.log(err));

// const timer = function (seconds) {
//   if (seconds === 0) return;
//   new Promise(setTimeout(() => console.log('second passed'), 1000));
//   return timer(seconds - 1);
// }
// timer(2).then(() => {
//   console.log('second passed');
//   return timer(1);
// }).then(() => console.log('one second passed'));

// timer(10);

//Promisifying Geolocation API


// getPosition().then(res => console.log(res)).catch(err => console.log(err));

// Using async await
// const whereAmI = async function () {
//   try {
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//     if (resGeo.status === 403) throw new Error('Only 1 try per second');
//     const geoData = await resGeo.json();
//     const res = await fetch(`https://restcountries.com/v3.1/name/${geoData.country}`);
//     if (!res.ok) throw new Error('Problem getting the country')
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${geoData.city}, ${geoData.country}`;
//   }
//   catch (err) {
//     console.error(`💣 ${err} `);
//     renderError(`💣 ${err}`)

//     // Reject promise returned from async func
//     throw err;
//   }

// }
// console.log('1: Get the location');
// const loc = whereAmI();
// console.log(location);

//Using then and catch
// whereAmI()
// .then(res => console.log(res))
// .catch(err => console.error(`3: ${err}`))
// .finally(() => console.log(console.log('3:Location Found')));

// Using async and IIFE

// (async function () {
//   try {
//     const country = await whereAmI();
//     console.log(`2: ${country}`);
//   } catch (err) {
//     console.error(`2: ${err}`)
//   }
//   console.log('3: Location Found');
// })()

// const get3countries = async function (c1, c2, c3) {
//   try {
    // fetching synchronously
    // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`)
    // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`)
    // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`)

    // console.log([...data1.capital, ...data2.capital, ...data3.capital]);

    // fetching Asynchronously / Promise.all()

//     const data = await Promise.all([getJson(`https://restcountries.com/v3.1/name/${c1}`), 
//     getJson(`https://restcountries.com/v3.1/name/${c2}`), 
//     getJson(`https://restcountries.com/v3.1/name/${c3}`)]);

//     console.log(data.map(c => c[0].capital[0]));
//   } catch (err) {
//     console.log(err);
//   }
// }

// get3countries('bulgaria', 'france', 'honduras')


// Promise.race() , Error Requst took to long

// const timeout = function(ms) {
//   return new Promise(function(_, reject) {
//     setTimeout(function(){
//       reject(new Error('Request took too long'));
//     }, ms);
//   })
// };

// (async function() {
//   const res = await Promise.race([getJson(`https://restcountries.com/v3.1/name/spain`), getJson(`https://restcountries.com/v3.1/name/italy`), getJson(`https://restcountries.com/v3.1/name/germany`), timeout(200)]);
//   console.log(res[0].name);
// })().then().catch(err => console.log(err));
