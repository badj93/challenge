import { makeAutoObservable } from 'mobx';

interface FiltersStore {
  setFilters: (filter: URLSearchParams) => void;
  getFilters: () => Record<string, string>;
  clearFilters: () => void;
  clearFilter: (filter: string) => void;
}

class Filters implements FiltersStore {
  private filters: Record<string, string> = Object.create(null);

  constructor() {
    makeAutoObservable(this);
  }

  setFilters(filter: URLSearchParams) {
    [...filter].forEach((filter) => {
      this.filters[filter[0]] = filter[1];
    });
  }

  getFilters() {
    return this.filters;
  }

  clearFilter(filter: string) {
    delete this.filters[filter];
  }

  clearFilters() {
    this.filters = Object.create(null);
  }
}

export const filtersStore = new Filters();
