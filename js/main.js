import { ViewModel } from "./viewmodel.js";

const viewModel = new ViewModel();

// DOM references
const weatherContainer = document.getElementById('weather');

const locations = document.getElementById('locations');

const loader = document.getElementById('loadal');

const themeSwitcher = document.getElementById('theme-switcher');


function setTheme(theme) {
    document.documentElement.className = theme;
}

// Change theme
themeSwitcher.addEventListener('change', (event) => {
    setTheme(event.target.value);
});

locations.addEventListener('change', (event) => {
    //getLocation(event.target.value);
    const targ = event.target.options[event.target.selectedIndex];
    const lat = Number(targ.getAttribute('data-lat'));
    const long = Number(targ.getAttribute('data-long'));
    const endpoint = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`;

    viewModel.loadWeather(endpoint);
})


function updateView(state) {
    // Locations
    locations.disabled = state.locations ? false : true;
    let options = `<option>Error retrieving locations</option>`;
    let thing = '';

    if (state.locations) {
        options = state.locations
            .map((location => `<option data-lat="${location.latitude}"  data-long="${location.longitude}">${location.city}, ${location.country}</option>`))
    }

    locations.innerHTML = options;

    // Weather
    
    if (state.weather) {
        console.log(state.weather.dataseries);
        thing = state.weather;
            //.map((location => `<option data-lat="${location.latitude}"  data-long="${location.longitude}">${location.city}, ${location.country}</option>`))
    }
}

// Subscribe to the ViewModel
viewModel.subscribe(updateView);

// Trigger API calls
//viewModel.loadWeather('https://api.example.com/weather');
//http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=xml
viewModel.loadLocations('locations.json');