// viewModel.js
import { getWeather, getLocations } from "./apiservice.js";

export class ViewModel {
	constructor() {
		this.state = {
			weather: null,
			locations: null,
			loadingWeather: false,
			loadingLocations: false,
			errorWeather: null,
			errorLocations: null,
		};
		this.listeners = [];
	}

	async loadWeather(endpoint) {
		this.state.loadingWeather = true;
		this.notify();

		try {
			const data = await getWeather(endpoint);
			this.state.weather = data;
			this.state.errorWeather = null;
		} catch (error) {
			this.state.errorWeather = error.message;
		} finally {
			this.state.loadingWeather = false;
			this.notify();
		}
	}

	// Fetch locations data
	async loadLocations(endpoint) {
		this.state.loadingLocations = true;
		this.notify();
		try {
			const data = await getLocations(endpoint);
			this.state.locations = data;
			this.state.errorLocations = null;
		} catch (error) {
			this.state.errorLocations = error.message;
		} finally {
			this.state.loadingLocations = false;
			this.notify();
		}
	}

	// Subscribe to changes
	subscribe(listener) {
		this.listeners.push(listener);
	}


	// Notify listeners
	notify() {
		this.listeners.forEach((listener) => listener(this.state));
	}
}