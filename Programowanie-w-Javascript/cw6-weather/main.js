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
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })
        .catch(error => console.log("Błąd: ", error));
}