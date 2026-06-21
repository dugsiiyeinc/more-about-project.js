const weatherFrom = document.querySelector('.weatherFrom');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const apikey = '1a9fe2ac9fce0b181b16be3ff5508ab0'

weatherFrom.addEventListener('submit', async event=>{
event.preventDefault()


    const issignIn = localStorage.getItem("users");

    if (!issignIn) {
        window.location.href = "login.html";
        return;
    }

    // continue weather logic here
    console.log("Fetching weather...");

const city = cityInput.value;

if(city){
try {
    const weatherData = await getWeatherInfo(city);
    displayWeatherInfo(weatherData);
} catch (error) {
    console.error(error);
    displayError(error);
}

}else{
    displayError('Please enter a city');
    
}
})

async function getWeatherInfo(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error('could not fetch weather data');
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, 
        main: {temp , humidity}, 
        weather: [{description,id}]} = data;

        card.textContent =''
        card.style.display ='flex'

        const cityDisplay     =  document.createElement('h1')
        const tempDisplay     =  document.createElement('p')
        const humidityDisplay =  document.createElement('p')
        const descDisplay     =  document.createElement('p')
        const weatherEmoji    =  document.createElement('p')

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp -273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id)


    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');
    humidityDisplay.classList .add('humidityDisplay');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}
function getweatherEmoji(weatherId){
    switch(true){
          case(weatherId >= 200 && weatherId < 300):
          return '⛈️'
          case(weatherId >= 300 && weatherId < 400):
          return '🌧️'
          case(weatherId >= 500 && weatherId < 600):
          return '🌧️'
          case(weatherId >= 600 && weatherId < 700):
          return '❄️'
          case(weatherId >= 700 && weatherId < 800):
          return '〰️'
          case(weatherId === 800):
          return '☀️'
          case(weatherId >= 800 && weatherId < 810):
          return '☁️'
          default:
            return '❓'
          
}
    }
  

function getWeatherEmoji(weatherId){

}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;

    errorDisplay.classList.add('errorDisplay')
    card.textContent ='';
    card.style.display = 'flex'
    card.appendChild(errorDisplay)
}