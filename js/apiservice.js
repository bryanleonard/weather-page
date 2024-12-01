  export async function fetchData(endpoint) {
    const resp = await fetch(endpoint);

    if (!resp.ok) {
        throw new Error('Failed to fetch data.')
    }
    return resp.json();
  }