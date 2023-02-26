const time = document.querySelector(".time");
const day = document.querySelector(".date");
const options = { month: "long", day: "numeric", timeZone: "UTC" };
const greeting = document.querySelector(".greeting");
const body = document.querySelector("body");
const name = document.querySelector(".name");
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
let isPlay = false;

showTime();
function showTime() {
  const date = new Date();
  time.textContent = date.toLocaleTimeString();
  setTimeout(showTime, 1000);
  showDate();
}

function showDate() {
  const date = new Date();
  let options;
  options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("ru-Ru", options);
  day.textContent = currentDate;
}

const timeOfDay = ["Доброй ночи", "Доброе утро", "Добрый день", "Добрый вечер"];
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let i = Math.floor(hours / 6);
  if (i == 1) {
    return (greeting.textContent = timeOfDay[1]);
  } else if (i == 2) {
    return (greeting.textContent = timeOfDay[2]);
  } else if (i == 3) {
    return (greeting.textContent = timeOfDay[3]);
  } else if (i == 0 || i == 4) {
    return (greeting.textContent = timeOfDay[0]);
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
city.value = "Minsk";
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=2a5d749c64b251d9bd8104ad9c066de3&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)}м/c`;
  humidity.textContent = `Влажность: ${data.main.humidity}%`;
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
  showQuote();
}

function showQuote() {
  const num = getRandomNum(1, data.length);
  quote.textContent = data[num - 1].text;
  author.textContent = data[num - 1].author;
}

changeQuote.addEventListener("click", () => {
  showQuote();
});

// Аудиоплеер
const playerPlay = document.querySelector(".player-button-play");
const playerNext = document.querySelector(".player-button-next");
const playerPrev = document.querySelector(".player-button-prev");
const title = document.querySelector(".title");

playerPlay.addEventListener("click", () => {
  playerPlay.classList.add("player-button-pause");
  if (isPlay === true) {
    pauseAudio();
    isPlay = false;
  } else {
    playAudio();
  }
});
let playNum = 0;
const audio = new Audio();
function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  listItem.forEach((el) => el.classList.remove("item-active"));
  listItem[playNum].classList.add("item-active");
}
playerPrev.addEventListener("click", () => {
  playerPlay.classList.add("player-button-pause");
  playNum == 0 ? (playNum = playList.length - 1) : playNum--;
  playAudio();
  isPlay = true;
});
playerNext.addEventListener("click", () => {
  playerPlay.classList.add("player-button-pause");
  playNum == playList.length - 1 ? (playNum = 0) : playNum++;
  playAudio();
  isPlay = true;
});
function pauseAudio() {
  audio.pause();
  playerPlay.classList.remove("player-button-pause");
}

import playList from "./playList.js";

const li = document.createElement("li");
const listItem = document.querySelectorAll(".play-item");

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

const audioPlayer = document.querySelector(".player");
const timeline = audioPlayer.querySelector(".timeline");
const lenght = document.querySelector(".length");

timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".play-time .current").textContent =
    getTimeCodeFromNum(audio.currentTime);
}, 500);

audio.addEventListener(
  "loadeddata",
  () => {
    lenght.textContent = playList[playNum].duration;
    audio.volume = 0.75;
  },
  false
);

const volumeSlider = document.querySelector(".volume-slider");
const volumePercentage = document.querySelector(".volume-percentage");
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + "%";
  },
  false
);

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
