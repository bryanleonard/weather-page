// apiService.js
export async function getWeather(endpoint) {
	const resp = await fetch(endpoint);

	if (!resp.ok) {
		throw new Error("Failed to fetch weather data");
	}
	return resp.json();
}

export async function getLocations(endpoint) {
	const resp = await fetch(endpoint);

	if (!resp.ok) {
		throw new Error("Failed to fetch locations");
	}
	return resp.json();
}
