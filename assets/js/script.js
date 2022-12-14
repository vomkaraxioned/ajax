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
   weather.innerHTML = "";
   const heading1 = document.createElement("h1"),
   heading2 = document.createElement("h2"),
   ul = document.createElement("ul"),
    li = document.createElement("li"),
    figure = document.createElement("figure"),
    img = document.createElement("img");
   heading1.classList.add("city");
   ul.classList.add("information");
    li.classList.add("info");
   figure.classList.add(".image");
   heading2.classList.add("weather");
   heading1.innerHTML = data.name+" "+data.main.temp+"&degC";
   weather.appendChild(heading1);
   img.src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    img.alt =""+data.weather[0].main+"";
    figure.appendChild(img);
    li.appendChild(figure);
    heading2.innerText = data.weather[0].main;
    li.appendChild(heading2);
    ul.appendChild(li);
    weather.appendChild(ul);
   weather.classList.add("weather-active");
   if(data.main.temp>=30){
       indexBody.classList.add("sunny")
   }else{
       indexBody.classList.add("cloudy");
   }

}