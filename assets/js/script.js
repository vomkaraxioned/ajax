/* Author: 

*/
let key;
let search = document.querySelector(".city-input span");
let searchField = document.querySelector(".city-input input");
const url = "https://api.openweathermap.org/data/2.5/weather?q={delhi}&appid={884256960b2dca1d89e7d4e8e6e894cd}";

search.addEventListener('click', () => {
    key = document.forms['search']['city-name'].value;
    alert(key);
    fetch(url).then(response => response.json()).then(commits => console.log(commits));
});

// searchField.addEventListener('keypress', search);