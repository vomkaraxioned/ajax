/* Author: 

*/
let key;
let search = document.querySelector(".city-input span");
let searchField = document.querySelector(".city-input input");
const url = "api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=metric";

search.addEventListener('click', () => {
    key = document.forms['search']['city-name'].value;
    alert(key);
});
searchField.addEventListener('keypress', search);