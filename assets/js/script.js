/* Author: 

*/
//variables for  local storage
const loginForm = document.querySelector("form[name=login]");
const logout = document.querySelector(".btn-logout");
const indexBody = document.querySelector(".weather-image");
let usernameField = document.querySelector(".user");
const cityName = document.querySelector(".city");
const figure = document.querySelector(".image");
//variables for api
let searchForm = document.querySelector("form[name=search]");
const minTemperature = document.querySelector(".min");
const maxTemperature = document.querySelector(".max");
const weather = document.querySelector(".weather");

function showError(errorField) {
    errorField.innerHTML = "This is required fields";
    errorField.style.display = "block";
}

function validate() {
    const inputField = document.querySelectorAll(".input-field");
    let uname, pass, valid = true;
    uname = inputField[0].children[0].value.trim();
    pass = inputField[1].children[0].value.trim();
    if (uname == "") {
        showError(inputField[0].children[1]);
    }
    if (pass == "") {
        showError(inputField[1].children[1]);
    }
    if (pass != "admin" && uname != "admin") {
        valid = false;
    }
    if (valid) {
        localStorage.setItem("uname", uname);
        location.href = "index.html";
    } else {
        alert("Invalid Credentials");
    }
}

if (loginForm) {
    document.onload = checkUser();
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validate();
    });
}

if (logout) {
    document.onload = checkUser();
    logout.addEventListener("click", () => {
        localStorage.removeItem("uname");
        location.href = "login.html";
    });
}

function checkUser() {
    if (!localStorage.getItem("uname")) {
        if (logout) {
            location.href = "login.html";
        }
    } else {
        if (loginForm) {
            location.href = "index.html";
        }
        alert("welcome back:" + localStorage.getItem("uname"));
    }
}

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let url, key;
        key = document.forms['search']['city-name'].value;
        url = "https://api.openweathermap.org/data/2.5/weather?q=" + key + "&appid=884256960b2dca1d89e7d4e8e6e894cd&units=metric";
        fetch(url).then((response) => response.json()).then(data => showWeather(data)).catch((e) => {
            cityName.innerHTML = e.msg;
            cityName.style.display = "block";
            minTemperature.style.display = "none";
            maxTemperature.style.display = "none";
            weather.style.display = "none";
            figure.style.display = "none";
            indexBody.classList.add("invalid");
        });
    });
}

function showWeather(data) {
    indexBody.className = "";
    cityName.innerHTML = data.name + "\t" + data.main.temp + "<sup>0</sup>c";
    minTemperature.children[0].innerHTML = data.main.temp_min;
    maxTemperature.children[0].innerHTML = data.main.temp_max;
    weather.innerHTML = data.weather[0].description;
    figure.children[0].src = " http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    weather.style.display = "flex";
    cityName.style.display = "block";
    minTemperature.style.display = "block";
    maxTemperature.style.display = "block";
    figure.style.display = "block";
    if (data.main.temp_max >= 30) {
        indexBody.classList.add("sunny");
    } else {
        indexBody.classList.add("cloudy");
    }
}