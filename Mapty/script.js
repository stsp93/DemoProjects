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




class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this))

        inputType.addEventListener('change', this._toggleElevationField)
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
            alert('Cannot get your location')
        })
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords
        const coords = [latitude, longitude]
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus()
    }

    _toggleElevationField() {
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();
        // Clear the Input Fields
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = ''
        // Display Marker
        const { lat, lng } = this.#mapEvent.latlng;
        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    minWidth: 150,
                    minHeight: 100,
                    autoClose: false,
                    className: 'running-popup',
                })).setPopupContent('Workout')
            .openPopup();
    }
}

const app = new App();




// Toggle Cadence, Elevation on type change

