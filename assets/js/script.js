/* Author: 

*/
//variables for  local storage
const loginForm = document.querySelector("form[name=login]"),
 logout = document.querySelector(".btn-logout"),
 weather = document.querySelector(".weather-display"),
 indexBody = document.querySelector(".weather-image");
//variables for api
let searchForm = document.querySelector("form[name=search]");

function showError(errorField) {
    const errBox = document.createElement("span");
    errBox.classList.add("err");
    errBox.innerText = "This is required field";
    errorField.appendChild(errBox);
}
function removeErrBox(inputField){
    let i;
  for(i=0;i<inputField.length-1;i++){
      console.log(inputField[i].children[1])
      if(inputField[i].children[1]){
        inputField[i].removeChild(inputField[i].children[1]);
      }
  }
}
function validate() {
    const inputField = document.querySelectorAll(".input-field");
    removeErrBox(inputField);
    let uname, pass, valid = true;
    uname = inputField[0].children[0].value.trim();
    pass = inputField[1].children[0].value.trim();
    if (uname == "") {
        showError(inputField[0]);
    }
    if (pass == "") {
        showError(inputField[1]);
    }
    if (pass != "admin" || uname != "admin") {
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
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function (){
          try{
            if(this.readyState == 4 && this.status == 200){
                this.responseType = "Json";
                 showWeather(JSON.parse(this.response));
            }else{
                throw this.status+" "+this.statusText;
            }
          }catch(e){
            indexBody.className="";
            weather.innerHTML = `<h1 class=\"city\">${e}</h1>`;
            weather.classList.add("weather-active");
            indexBody.classList.add("weather-image");
          }
        };
        xmlHttp.open('GET',url);
        xmlHttp.send();
    });
}

function showWeather(data) {
   indexBody.className="";
   weather.innerHTML = `<h1 class=\"city\">${data.name} ${data.main.temp}&degC</h1><ul class=\"information\"><li class=\"info\"><h2 class=\"min\">Min:<span>${data.main.temp_min}</span>&degCC</h2><h2 class=\"max\">Max:<span>${data.main.temp_max}</span>&degC</h2></li><li class=\"info\"><figure class=\"image\"><img src=\"http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png\" alt=\"${data.weather[0].main}\"></figure><h2 class=\"weather\">${data.weather[0].main}</h2></li></ul>`;
   weather.classList.add("weather-active");
   if(data.main.temp>=30){
       indexBody.classList.add("sunny")
   }else{
       indexBody.classList.add("cloudy");
   }

}