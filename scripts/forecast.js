const key = '	bpRGJ5wALxEMl3Kjkkk8jossQ3ukDppJ';

// get weather information
const getWeather = async (id) => {
  
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
  
    const response = await fetch(base + query);
    const data = await response.json();
  
    return data[0];
    // console.log(data)
  
  };
  
  // get city information
  const getCity = async (city) => {
  
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
  
    const response = await fetch(base + query);
    const data = await response.json();

    // console.log(data)
   
    return data[0];
  
  };

const dailyForecast = async(forecastId)=>{
    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${forecastId}?apikey=${key}`


    const response = await fetch(base + query);
    const data = await response.json();
     return data;
    
}


