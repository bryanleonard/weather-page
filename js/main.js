import { ViewModel } from "./viewmodel.js";

const viewModel = new ViewModel();

// DOM references
const weatherContainer = document.getElementById("weather");

const locations = document.getElementById("locations");

const loader = document.getElementById("loader");

const themeSwitcher = document.getElementById("theme-switcher");

function setTheme(theme) {
	document.documentElement.className = theme;
}

// Change theme
themeSwitcher.addEventListener("change", (event) => {
	setTheme(event.target.value);
});

locations.addEventListener("change", (event) => {
	const targ = event.target.options[event.target.selectedIndex];
	const lat = Number(targ.getAttribute("data-lat"));
	const long = Number(targ.getAttribute("data-long"));
	const endpoint = `https://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`;	
	viewModel.loadWeather(endpoint);
	weatherContainer.innerHTML = ''; // Clear out any previous data.
});

function updateView(state) {
	// Save the current selection value
	const selectedValue = locations.value;

	// Show or hide loader based on loading state
	loader.style.display = state.loadingWeather ? 'block' : 'none';
	

	// Locations
	locations.disabled = state.locations ? false : true;

	let options;
	let cards = "";

	if (state.locations) {
		options = `<option>Select</option>`;
		options += state.locations.map(
			(location) =>
				`<option data-lat="${location.latitude}" data-long="${location.longitude}" 
					${selectedValue === `${location.city}, ${location.country}` ? "selected" : ""}>
					${location.city}, ${location.country}
            	</option>`
		);
	}

	locations.innerHTML = options;

	// --------------- */

	loader.style.display = state.loadingWeather ? 'block' : 'none';

	const formatDate = (dateStr) => {
		dateStr = dateStr.toString();
		const year = parseInt(dateStr.substring(0, 4));
		const month = parseInt(dateStr.substring(4, 6)) - 1;
		const day = parseInt(dateStr.substring(6, 8));
		const date = new Date(year, month, day);
		const options = { month: "short", day: "2-digit" };
		return date.toLocaleDateString("en-US", options);
	};

	const convertToF = (temp) => {
		return parseInt((temp * 9 / 5) + 32);
	}

	// Weather
	const makeCard = (data) => {
		return `<div class="card-container flex-fill">
					<div class="card text-center">
                        <h5 class="text-center">${formatDate(data.date)}</h5>
                        <div class="col-12">
                            <img src="/images/${data.weather}.png" class="img-fluid">
                        </div>
                        <div class="row">
                            <div class="col-6 ps-0 temp tempHi pt-1">H: ${convertToF(data.temp2m.max)} ºF</div>
                            <div class="col-6 pe-0 temp tempLo pt-1">L: ${convertToF(data.temp2m.min)} ºF</div>
                        </div>
                    </div>
				</div>`;
	};

	

	if (state.weather) {
		cards = state.weather.dataseries.map(makeCard).join("");
		weatherContainer.innerHTML = cards;
	}
	else if (state.errorWeather != null) {
		weatherContainer.innerHTML = `<p class="mt-3">There was an error retrieving the data.</p>`;
	}
	
}

// Subscribe to the ViewModel
viewModel.subscribe(updateView);

// Trigger API calls
viewModel.loadLocations("locations.json");
