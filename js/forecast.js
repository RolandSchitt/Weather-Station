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
  const mapsURL = `http://dataservice.accuweather.com/imagery/v1/maps/radsat/480x480/`;
  
  //update UI with weather info
  const weather = document.querySelector('#weth');
  weather.innerHTML = 
    `<p>${locationCity}, ${locationCountry}<p>
    <p><a id="degrees" class="fahrenheit">${tempF}° F</a></p>
    <p>${description}</p>
    <p><img src="icons/${icon}.svg" alt="${description}"></p>`;

  console.log(dataObj);

  //
}