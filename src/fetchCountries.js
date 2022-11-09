import Notiflix from 'notiflix';
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      responseOk(response);
      return response.json();
    })
    .then(array => {
      if (array.length > 10) {
        oneMakesMarkup();
        return;
      }
      if (array.length === 1) {
        twoMakesMarkup(array);
        return;
      }
      threeMakesMarkup(array);
    });
}
// .catch(error => console.log(` ${error}`));
function oneMakesMarkup() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
// Разметка, если в поиске - 1 страна----------------------
function twoMakesMarkup(array) {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = `
  <p style="font-size: 30px;"> 
   <img src="${array[0].flags.svg}" alt="" width="50px" />${
    array[0].name.official
  }
 
 <p style= "font-weight: bold";  > Capital:
 <span style="font-size: 16px"> ${array[0].capital}  </span>
 </p>
 
  <p style= "font-weight: bold";  > Population:
 <span style="font-size: 16px"> ${array[0].population}  </span>
 </p>

 <p style= "font-weight: bold";  > Languages:
 <span style="font-size: 16px"> ${Object.values(
   array[0].languages
 ).join()}  </span>
 </p>
 `;
}
// Разметка, если в поиске - 1 страна----------------------
// Разметка, если в поиске - от 2 до 10 стран----------------------
function threeMakesMarkup(array) {
  countryInfoEl.innerHTML = '';
  const markup = array
    .map(el => {
      return `<li>
   <p style="font-size: 16px;"> 
    <img  src="${el.flags.svg}" alt="" width="40px"/>
   ${el.name.official}
   </p>
              </li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}
// Разметка, если в поиске - от 2 до 10 стран--------------------
function responseOk(response) {
  if (!response.ok) {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    throw new Error(
      Notiflix.Notify.failure(
        `Error ${response.status}. Oops, there is no country with that name`
      )
    );
  }
}