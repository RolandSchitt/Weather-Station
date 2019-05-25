const key = 'mRVh1Oee4YOZbIFEHPofhAZ969GBRqmb';

const getCity = async (zip) => {
  const url = 'http://dataservice.accuweather.com/locations/v1/postalcodes/search';
  const query = `?apikey=${key}&q=${zip}`;

  const response = await fetch(url + query);
  const data = await response.json();

  return data[0].Key;
};

const getCurrentConditions = async (locationKey) => {
  const url = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${locationKey}?apikey=${key}`;

  const response = await fetch(url + query);
  const data = await response.json();
  
  return data;
}

// getCity('32205')
//   .then(data => {
//     return getCurrentConditions(data.Key);
//     // console.log(data.Key);
//   })
//   .then (data => console.log(data))
//   .catch(err => console.log(err));
