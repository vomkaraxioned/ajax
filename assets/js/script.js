/* Author: 

*/
let key;
let search = document.querySelector(".city-input span");
let searchField = document.querySelector(".city-input input");


search.addEventListener('click', () => {
    key = document.forms['search']['city-name'].value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=+" + key + "&appid=884256960b2dca1d89e7d4e8e6e894cd&units=metric";
    fetch(url).then((response) => response.json()).then(data => showWeather(data));
});
// searchField.addEventListener('keypress', search);

function showWeather(data) {
    const cityName = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const weather = document.querySelector(".weather");
    console.log(data);
    cityName.innerHTML = data.name;
    temperature.innerHTML = "Min." + data.main.temp_min + "'C" + " " + "Max." + data.main.temp_max + "'C";
    weather.style.content = "\${data.weather[0].icon}";
    weather.innerHTML = data.weather[0].description;
}