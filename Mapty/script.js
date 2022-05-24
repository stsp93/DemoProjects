'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords
    const coords = [latitude, longitude]
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus()
    })
}, function () {
    alert('Cannot get your location')
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Clear the Input Fields
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = ''
    
    // Display Marker
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
        L.popup({
        minWidth: 150,
        minHeight: 100,
        autoClose: false,
        className: 'running-popup',
    })).setPopupContent('Workout')
        .openPopup();
})

// Toggle Cadence, Elevation on type change

inputType.addEventListener('change', function() {
    console.log('agasgasg');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
})