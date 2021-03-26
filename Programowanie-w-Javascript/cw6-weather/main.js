// pobranie referencji
const inputText = document.querySelector('#cityName');
const addCityButton = document.querySelector('#addCity');
const showData = document.querySelector('#cityData');

// Klucz API do strony OpenWeather.org
const apiKey = 'c18e218d437295f57f6cf1900d5fe9cc';

// Zdarzenie klika dla buttona
addCityButton.addEventListener('click', GetDataFromAPI);


function GetDataFromAPI() {
    const cityInput = inputText.value;
    console.log(cityInput);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    // Otrzymanie danych z API (fetch)
    fetch(apiUrl)
        .then(data =>{
            return data.json();
        }).then(showWeatherReport)
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

    // Wyświetlenie wszystkich danych 
    showData.innerHTML =`
         <div>
            <div class="cityInfo">${data.name}, ${data.sys.country}</div>
            <div class="description">${data.weather[0].description}</div>
            <div class="temperature">${data.main.temp}°C</div>
            <div class="icon"><img src= ${icon.src}></div>
            <div class="pressure">Ciśnienie: ${data.main.pressure}</div>
            <div class="humidity">Wilgotność: ${data.main.humidity}</div>
         </div>
      `; 
}

