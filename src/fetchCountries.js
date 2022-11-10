// import { responseOk } from './index.js';
import Notiflix from 'notiflix';
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      countryListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
      throw new Error(
        Notiflix.Notify.failure(
          `Error ${response.status}. Oops, there is no country with that name`
        )
      );
    }
    return response.json();
  });
}
