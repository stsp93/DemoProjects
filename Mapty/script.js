'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class Workout {
    date = new Date()
    id = String(Date.now()).slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords; //[lat, ton]
        this.distance = distance; //km
        this.duration = duration; //min
    }

}
class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence
        this.pace = duration / distance //min/km
        this.type = 'running'
    }
}
class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.speed = distance / (duration / 60); // km/h
        this.type = 'cycling'
    }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const elevationDiv = document.querySelector('.elevation_div');
const cadenceDiv = document.querySelector('.cadence_div');

class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        this._getPosition();
        
        form.addEventListener('submit', this._newWorkout.bind(this))
        
        this._checkType();
        
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

    _checkType() {
        if(inputType.value === 'cycling'){
            elevationDiv.classList.remove('form__row--hidden');
            cadenceDiv.classList.add('form__row--hidden')
        } else {
            elevationDiv.classList.add('form__row--hidden');
            cadenceDiv.classList.remove('form__row--hidden')
        }
    }

    _toggleElevationField() {
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const isPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        const type = inputType.value;
        const distance = inputDistance.value;
        const duration = inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (!validInput(distance, duration, elevation) && !isPositive(distance, duration)) return alert('Choose positive numbers(except for the elevation)');
            workout = new Cycling([lat, lng], distance, duration, elevation);
            this.#workouts.push(workout);
        }

        if (type === 'running') {
            const cadence = +inputCadence.value;
            if (!validInput(distance, duration, cadence) && !isPositive(distance, duration, cadence)) return alert('Choose positive numbers');
            workout = new Running([lat, lng], distance, duration, cadence);
            this.#workouts.push(workout);
        }

        // Clear the Input Fields
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = ''
        // Display Marker
        this.renderWorkoutMarker(workout)
    }

    renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    minWidth: 150,
                    minHeight: 100,
                    autoClose: false,
                    className: `${workout.type}-popup`,
                })).setPopupContent(`${workout.type}`)
            .openPopup();
    }
}

const app = new App();





