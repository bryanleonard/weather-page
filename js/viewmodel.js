// viewModel.js
import { fetchData } from './apiService.js';

export class ViewModel {
  constructor() {
    this.state = { data: null, loading: false, error: null };
    this.listeners = [];
  }

  async loadData(endpoint) {
    this.state.loading = true;
    this.notify();
    try {
      const data = await fetchData(endpoint);
      this.state.data = data;
      this.state.error = null;
    } catch (error) {
      this.state.error = error.message;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}



import { fetchData } from './apiservice.js';

export class ViewModel {

    constructor() {
        this.state = {data: null, loading: false, error: null };
        this.listeners = [];
    }

}