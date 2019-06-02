class Forcast {
  constructor(){
    this.key = 'mRVh1Oee4YOZbIFEHPofhAZ969GBRqmb';
    this.zipURL = 'https://dataservice.accuweather.com/locations/v1/postalcodes/search';
    this.conditionsURL = 'https://dataservice.accuweather.com/currentconditions/v1/';
  }
  async weatherUpdate(zip){
    const locationInfo = await this.getLocation(zip);	
  	const weatherObj = await this.getCurrentConditions(locationInfo);
    return { locationInfo, weatherObj };
  }
  async getLocation(zip){
    const query = `?apikey=${this.key}&q=${zip}`;
    const response = await fetch(this.zipURL + query);
    const locationData = await response.json();
    return locationData[0];
  }
  async getCurrentConditions(locationInfo){
    const query = `${locationInfo.Key}?apikey=${this.key}&?details=true`;
    const response = await fetch(this.conditionsURL + query);
    const conditionsData = await response.json();
    return conditionsData;
  }
}
// const getImages = async (zipObj) => {
//   const url = `http://dataservice.accuweather.com/imagery/v1/maps/radsat/480x480/`;
//   const query = `${zipObj.Key}?apiKey=${key}`;

//   const response = await fetch(url + query);
//   const data = await response.json();

//   return data;
// }


const updateUI = (dataObj) => {
  const locationCity = dataObj.locationInfo.LocalizedName;
  const locationCountry = dataObj.locationInfo.AdministrativeArea.LocalizedName;
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