'use strict';

// prettier-ignore



class Workout {
    date = new Date()
    id = String(Date.now()).slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords; //[lat, ton]
        this.distance = distance; //km
        this.duration = duration; //min
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}
class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence
        this.pace = duration / distance //min/km
        this.type = 'running'
        this._setDescription()
    }
}
class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.speed = distance / (duration / 60); // km/h
        this.type = 'cycling'
        this._setDescription()
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
const clearData = document.querySelector('.clear_data');
const workoutSort = document.querySelector('.workout_sort');

class App {
    #map;
    #mapZoomLvl = 13;
    #mapEvent;
    #workouts = [];
    #workoutState;
    #sortedWorkouts = false;
    #markers = [];

    constructor() {
        this._getPosition();
        this._getLocalStorage();

        this._checkType();
        form.addEventListener('submit', this._newWorkout.bind(this))
        inputType.addEventListener('change', this._checkType);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
        containerWorkouts.addEventListener('click', this._closeWorkout.bind(this));
        clearData.addEventListener('click', this._clearData);
        workoutSort.addEventListener('click', this._sortWorkouts.bind(this))
        this._closeWorkout();
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
            alert('Cannot get your location')
        })
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords
        const coords = [latitude, longitude]
        this.#map = L.map('map').setView(coords, this.#mapZoomLvl);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on('click', this._showForm.bind(this))
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus()
    }

    _hideForm() {
        // Clear the Input Fields
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
        //hide form
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);

    }

    _checkType() {
        if (inputType.value === 'cycling') {
            elevationDiv.classList.remove('form__row--hidden');
            cadenceDiv.classList.add('form__row--hidden')
        } else {
            elevationDiv.classList.add('form__row--hidden');
            cadenceDiv.classList.remove('form__row--hidden')
        }
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

        this._hideForm();
        
        // Display Marker
        this._renderWorkoutMarker(workout)
        this._renderWorkout(workout)

        //Store in localStorage
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout) {
        const marker = new L.marker(workout.coords);
        this.#markers.push([marker,workout.id]);
        marker
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    minWidth: 150,
                    minHeight: 100,
                    autoClose: false,
                    className: `${workout.type}-popup`,
                })).setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <span class="workout__close">&#10006;</span>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;

        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>`
        };
        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`
        }
        form.insertAdjacentHTML('afterend', html);

    }
    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        //Guard Clause
        if(!workoutEl) return;

        const workout = this.#workouts.find(el => el.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#map.getZoom(), {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));

        //Guard Clause
        if(!data) return;

        this.#workouts = data;
        this.#workouts.forEach(work => {
            this._renderWorkout(work)

        });
    }

    _clearData() {
        localStorage.removeItem('workouts')
        location.reload()
    }

    _closeWorkout(e){
        if(!e) return;
        if(!e.target.closest('.workout__close')) return;

        const workoutCloseEl = e.target.closest('.workout__close');
        const workoutEl = workoutCloseEl.closest('.workout');

        const markerAndId = this.#markers.find(m => m[1] === workoutEl.dataset.id);
        this.#markers = this.#markers.filter(m => m[1] !== workoutEl.dataset.id);
        this.#workouts = this.#workouts.filter(w => w.id !== workoutEl.dataset.id);
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
        this.#map.removeLayer(markerAndId[0]);
        workoutEl.remove();
    }

    _sortWorkouts() {
        document.querySelectorAll('.workout').forEach(el => el.remove());
        // save the state
        this.#workoutState = this.#workouts.slice();
        // sort if not sorted
        if(!this.#sortedWorkouts) {
            this.#workouts.sort((a, b) => a.distance - b.distance);
        }
        // render workouts
        this.#workouts.forEach(work => this._renderWorkout(work));
        
        this.#workouts = this.#workoutState.slice();
        this.#sortedWorkouts = !this.#sortedWorkouts;
        console.log(this.#sortedWorkouts);

    }
}

const app = new App();




