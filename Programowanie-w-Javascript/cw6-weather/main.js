// pobranie referencji
const inputText = document.querySelector('#cityName');
const addCityButton = document.querySelector('#addCity');
let showData = document.querySelector('#cityData');

// Klucz API do strony OpenWeather.org
const apiKey = 'c18e218d437295f57f6cf1900d5fe9cc';

// Zdarzenie klika dla buttona
addCityButton.addEventListener('click', GetDataFromAPI);

// zmienne
const localStorageKey = 'weathers';
let weatherArray = [];
let iconId;
let weatherObj = Object();

const localStorageContent = localStorage.getItem(localStorageKey);


if(localStorageContent === null){
    weatherArray = [];
}else{
    weatherArray = JSON.parse(localStorageContent);
}

console.log('arrayfromLS',weatherArray);

function GetDataFromAPI() {
    const cityInput = inputText.value;
    console.log(cityInput);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    // Otrzymanie danych z API (fetch)
    fetch(apiUrl)
        .then(data => data.json())
        .then(showWeatherReport)
        .then(SaveTOLocalStorage)
        .then(ViewLocalStorage)
        //.then(showWeather)
        // .catch(error => console.log('Błąd: ', error));
        .catch(error => console.log('Błąd: ', error)).innerHTML='Zła nazaww misata';
}

function  showWeatherReport(data) {

    console.log('daneZapy',data);
    inputText.value ='';
    iconId = data.weather[0].icon;
    let iconUrl = 'http://openweathermap.org/img/wn/' + iconId + '@2x.png';
    let icon = new Image();
    icon.src = iconUrl;
    console.log(iconUrl);

    weatherObj = {
        name: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        temperature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        iconUrl: iconUrl
    };
  
  
    console.log('oryginalOBJ,', weatherObj);
    weatherArray.push(weatherObj);
}

console.log(weatherArray);

function SaveTOLocalStorage() {
    console.log(weatherObj);
    localStorage.setItem(localStorageKey, JSON.stringify(weatherArray));
}

function ViewLocalStorage() {

    let htmlNote='';
    weatherArray.forEach(function (weatherObj,index) {
        htmlNote +=`
        <div class="weatherWrapper">
             <div class="cityInfo">${weatherObj.name}, ${weatherObj.country}</div>
             <div class="description">${weatherObj.description}</div>
             <div class="icon"><img src= ${weatherObj.iconUrl}></div>
             <div class="temperature">${weatherObj.temperature}°C</div>
            <div class="pressure">Ciśnienie: ${weatherObj.pressure} hPA</div>
            <div class="humidity">Wilgotność: ${weatherObj.humidity}%</div>
            <button id ="${index}" onclick ="deleteNote(this.id)"
            class="deleteNoteBtn">Delete</button>
         </div>
    `;
        showData.innerHTML = htmlNote;
    });
}

// eslint-disable-next-line no-unused-vars
function  deleteNote(index) {
    
    weatherArray.splice(index,1);
    localStorage.setItem(localStorageKey, JSON.stringify(weatherArray));
    ViewLocalStorage();

    // odswieza strone gdy notes(tablica) == null
    if(index == 0 || localStorageContent === null)  {
        window.location.reload();}
}

ViewLocalStorage();