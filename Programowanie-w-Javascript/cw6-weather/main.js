// pobranie referencji
const inputText = document.querySelector('#cityName');
const addCityButton = document.querySelector('#addCity');
const showData = document.querySelector('#cityData');

// Klucz API do strony OpenWeather.org
const apiKey = 'c18e218d437295f57f6cf1900d5fe9cc';

// Zdarzenie klika dla buttona
addCityButton.addEventListener('click', GetDataFromAPI);

const localStorageKey = 'weathers';
let weatherArray = [];

function GetDataFromAPI() {
    const cityInput = inputText.value;
    console.log(cityInput);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    // Otrzymanie danych z API (fetch)
    fetch(apiUrl)
        .then(data => data.json())
        .then(showWeatherReport)
        // .catch(error => console.log('Błąd: ', error));
        .catch(error => console.log('Błąd: ', error)).innerHTML='Zła nazaww misata';
}

function  showWeatherReport(data) {
    console.log(data);
    // Wyczyszczenie inputa po wprowadzeniu danych
    inputText.value ='';
    let iconId = data.weather[0].icon;
    let iconUrl = 'http://openweathermap.org/img/wn/' + iconId + '@2x.png';
    let icon = new Image();
    icon.src = iconUrl;
    console.log(iconUrl);

    let weatherObj = {
        name: data.name,
        main : {
            description: data.weather[0].description,
            temperature: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity
        }
    };

    weatherArray.push(weatherObj);
    weatherArray = localStorage.setItem(localStorageKey, JSON.stringify(weatherObj));
    // Wyświetlenie wszystkich danych 
    console.log(weatherObj);

    showData.innerHTML +=`
         <div class="weatherWrapper">
            <div class="cityInfo">${weatherObj.name}</div>
            <div class="description">${weatherObj.main.description}</div>
            <div class="temperature">${weatherObj.main.temperature}°C</div>
            <div class="pressure">Ciśnienie: ${weatherObj.main.pressure} hPA</div>
            <div class="humidity">Wilgotność: ${weatherObj.main.humidity}%</div>
         </div>
      `; 
}



//weatherArray.push(weatherObj);
console.log(weatherArray);
