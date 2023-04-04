//declaring variables for DOM
let inputCity = document.querySelector(".searchbox input");
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let condition = document.querySelector(".type")
// let rainfall=document.querySelector(".rainfall")
// For date 
let time = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let dates = time.toLocaleDateString(undefined, options);
document.querySelector("#date").innerHTML = dates;
let hours = time.getHours();
hours = hours < 10 ? "0" + hours : hours;
const am = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours === 0 ? 12 : hours;
let min = time.getMinutes();
min = min < 10 ? "0" + min : min;
document.querySelector(".time").innerHTML = 'TIME:' + hours + ":" + min + am;

// main functions:
async function weatherData(place) {
    place = place.toLowerCase();
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=+" + place + "&appid=7c23587871273ded50fd57bd9f6f7f6e&units=metric");
    if (!response.ok) {
        alert("city not found")
    }
    let data = await response.json();
    console.log(data);
    temp.innerHTML = Math.round(data.main.temp) + " °C";
    city.innerHTML = data.name + ", " + data.sys.country;
    humidity.innerHTML = data.main.humidity + " %";
    pressure.innerHTML = data.main.pressure + " hPa"
    windSpeed.innerHTML = Math.round(data.wind.speed * 3.6) + " km/hr";
    condition.innerHTML = data.weather[0].main;
    // rainfall.innerHTML=data.rain?.["1h"] || 0;
    document.querySelector(".condition").src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

}
if (!inputCity.value) {
    weatherData("Montgomery COUNTY");
}
function mainFunction() {
    weatherData(inputCity.value);
}
