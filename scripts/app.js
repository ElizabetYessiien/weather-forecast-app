const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const displayFc = document.querySelector(".display-forecast");

const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather, forecast } = data;



  let theForecasts = forecast.DailyForecasts.forEach((fc) => {
    

    let maxFah =fc.Temperature.Maximum.Value;
    let minFah = fc.Temperature.Minimum.Value

    let m = moment()
    m=moment(fc.Date)
    const actualDate = m._d
    
    
//formula for celcius
    let celsius1 = Math.floor((maxFah - 32) * (5/9));
    let celsius2 = Math.floor((minFah  - 32) * (5/9));


    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
    <div>
    <p> <span class="date">Date<span> : ${actualDate}</p>
    <p><span class="weather">Weather(Day):</span> ${fc.Day.IconPhrase}</p>
    <img class="images" src="img/icons/${fc.Day.Icon}.svg"/>
    <p><span class="weather">Weather(Night):</span> ${fc.Night.IconPhrase}</p>
    <img class="images" src="img/icons/${fc.Night.Icon}.svg"/>
    <p><span class="tempt">Maximum Tempt :</span> ${celsius1}˚C</p>
     <p><span class="tempt">Minimum Tempt : </span>${celsius2}˚C</p>
    </div>
  
    `;

    displayFc.appendChild(box);

    setTimeout(()=>{
      box.innerHTML = '';
      box.classList.remove('box')
    }, 6000)
    
  });
  

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
  
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>

  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  // remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  const forecast = await dailyForecast(cityDets.Key);

  return { cityDets, weather, forecast };
};


cityForm.addEventListener("submit", (e) => {

  // prevent default action
  e.preventDefault();


  // get city value
  const city = cityForm.city.value.trim();


  cityForm.reset();

  

  // update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
