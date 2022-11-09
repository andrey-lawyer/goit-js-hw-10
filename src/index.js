import './css/styles.css';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
inputEl.addEventListener('input', debounce(onInput, 300));

function onInput(event) {
  const value = event.target.value;
  // console.log(value.trim());
  if (value.trim() == '') {
    return;
  }
  fetchCountries(value.trim());
}
