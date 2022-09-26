/* Author: 

*/
//variables for  local storage
const loginForm = document.querySelector("form[name=login");
const err = document.querySelectorAll(".err");
const logout = document.querySelector(".btn-logout");
const indexBody = document.querySelector(".weather-image");
let usernameField = document.querySelector(".user");
const cityName = document.querySelector(".city");
//variables for api
let searchForm = document.querySelector("form[name=search]");
let searchField = document.querySelector(".city-input input");
const minTemperature = document.querySelector(".min");
const maxTemperature = document.querySelector(".max");
const weather = document.querySelector(".weather");


if (loginForm) {
    document.onload = checkUser();
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        uname = document.forms["login"]["uname"].value.trim();
        let pass = document.forms["login"]["pass"].value.trim();
        err[0].style.display = "none";
        err[1].style.display = "none";
        if (uname == "") {
            valid = false;
            err[0].innerHTML = "Enter username";
            err[0].style.display = "block";
        }
        if (pass == "") {
            valid = false;
            err[1].innerHTML = "Enter password";
            err[1].style.display = "block";
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
            indexBody.style.background = "url(assets/images/weather1.jpg)";
        });
    });
}

function showWeather(data) {
    console.log(data);
    const figure = document.querySelector(".image");
    cityName.innerHTML = data.name;
    minTemperature.children[0].innerHTML = data.main.temp_min;
    maxTemperature.children[0].innerHTML = data.main.temp_max;
    weather.innerHTML = data.weather[0].description;
    figure.children[0].src = " http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    cityName.style.display = "block";
    weather.style.display = "flex";
    minTemperature.style.display = "block";
    maxTemperature.style.display = "block";
    figure.style.display = "block";
    if (data.main.temp_max >= 30) {
        indexBody.style.background = "url(assets/images/sunny.jpg)";
    } else {
        indexBody.style.background = "url(assets/images/cloudy.jpg)";
    }
}