const time = document.querySelector(".time");
const date = new Date();
const hours = date.getHours();
const day = document.querySelector(".date");
const currentTime = date.toLocaleTimeString();
const options = { month: "long", day: "numeric", timeZone: "UTC" };
const currentDate = date.toLocaleDateString("en-En", options);
const greeting = document.querySelector(".greeting");
const body = document.querySelector("body");
const name = document.querySelector(".name");
body.style.backgroundImage =
  "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
let randomNum = getRandomNum(1, 21);
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");

const changeQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
let data = [];
let cityInput = "";

showTime();
function showTime() {
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
}

function showDate() {
  day.textContent = currentDate;
}
showDate();

function getTimeOfDay() {
  let i = Math.floor(hours / 6);
  if (i == 1) {
    return (greeting.textContent = "Good morning");
  } else if (i == 2) {
    return (greeting.textContent = "Good afternoon");
  } else if (i == 3) {
    return (greeting.textContent = "Good evening");
  } else if (i == 0 || i == 4) {
    return (greeting.textContent = "Good night");
  }
}
getTimeOfDay();

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setBg() {
  if (randomNum < 10) {
    randomNum = randomNum.toString().padStart(2, "0");
  }
  if (getTimeOfDay() == "Good afternoon") {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/${randomNum}.jpg')`;
  } else if (getTimeOfDay() == "Good evening") {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${randomNum}.jpg')`;
  } else if (getTimeOfDay() == "Good night") {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/${randomNum}.jpg')`;
  } else {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/${randomNum}.jpg')`;
  }
}
setBg();
console.log(Number(randomNum));
slidePrev.addEventListener("click", function clickPrev() {
  if (randomNum == 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg(randomNum, clickPrev);
});

slideNext.addEventListener("click", function clickNext() {
  if (randomNum == 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg(randomNum, clickNext);
});

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=2a5d749c64b251d9bd8104ad9c066de3&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Скорость ветра: ${data.wind.speed}м/c`;
  humidity.textContent = `Влажность: ${data.main.humidity}%`;
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}
getWeather();
city.addEventListener("change", () => {
  cityInput = city.value;
  getWeather();
});

getQuotes();
async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  data = await res.json();
  console.log(data);
  showQuote();
}
// showQuote();

function showQuote() {
  const num = getRandomNum(1, data.length);
  quote.textContent = data[num - 1].text;
  author.textContent = data[num - 1].author;
}

changeQuote.addEventListener("click", () => {
  showQuote();
});



function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);
