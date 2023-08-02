'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//Fazendo uma chamada AJAX

const renderCountry = function (data, className="") {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);

  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${+(
          data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${languages[0]}</p>
        <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryNeighborData = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest(); //Essa é uma maneira antiga de fazer chamadas ajax
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbout country 2
    const neighbour = data.borders?.[0];

    //AJAX call country 2
    const request2 = new XMLHttpRequest(); //Essa é uma maneira antiga de fazer chamadas ajax
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour')
    });
  });
};

getCountryNeighborData('brazil');
