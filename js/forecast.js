const key = 'mRVh1Oee4YOZbIFEHPofhAZ969GBRqmb';


const getCity = async (zip) => {
  const url = 'http://dataservice.accuweather.com/locations/v1/postalcodes/search';
  const query = `?apikey=${key}&q=${zip}`;

  const response = await fetch(url + query);
  const data = await response.json();
  
  return data[0];
};

const getCurrentConditions = async (zipObj) => {
  const url = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${zipObj.Key}?apikey=${key}&?details=true`;

  const response = await fetch(url + query);
  const data = await response.json();
  
  return data;
}

const getImages = async (zipObj) => {
  const url = `http://dataservice.accuweather.com/imagery/v1/maps/radsat/480x480/`;
  const query = `${zipObj.Key}?apiKey=${key}`;

  const response = await fetch(url + query);
  const data = await response.json();

  return data;
}


const updateUI = (dataObj) => {
  const locationCity = dataObj.zipDeets.LocalizedName;
  const locationCountry = dataObj.zipDeets.AdministrativeArea.LocalizedName;
  const tempF = dataObj.weatherObj[0].Temperature.Imperial.Value;
  const tempC = dataObj.weatherObj[0].Temperature.Metric.Value;
  const description = dataObj.weatherObj[0].WeatherText;
  const icon = dataObj.weatherObj[0].WeatherIcon;
  let tempVal = 1;
  
  //update UI with weather info
  const weather = document.querySelector('#weth');
  weather.innerHTML = 
    `<p>${locationCity}, ${locationCountry}<p>
    <p><a id="degrees" class="fahrenheit">${tempF}° F</a></p>
    <p>${description}</p>
    <p><img src="icons/${icon}.svg" alt="${description}"></p>`;

  //Toggle Temp scale between F & C
  const unit = document.querySelector('#degrees');

  unit.addEventListener('click', e => {
    e.preventDefault();
    if (tempVal === 1) {
      unit.innerText = `${tempC}° C`;
      tempVal = 0;
    }
    else {
      unit.innerText = `${tempF}° F`;
      tempVal = 1;
    }
  });

    //  API does not offer free imagery
  //update UI with radar imagery
  // const images = document.querySelector('#results');
  // // images.innerHTML = ``;
  // console.log(dataObj);
}