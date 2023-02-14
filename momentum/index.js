window.addEventListener("DOMContentLoaded", () => {
  const time = document.querySelector(".time");
  const date = new Date();
  const hours = date.getHours();
  const day = document.querySelector(".date");
  const currentTime = date.toLocaleTimeString();
  const options = { month: "long", day: "numeric", timeZone: "UTC" };
  const currentDate = date.toLocaleDateString("en-En", options);
  const greeting = document.querySelector('.greeting')
  const body = document.querySelector('body')
  body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
  function showTime() {
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
  }
  showTime();
  function showDate() {
    day.textContent = currentDate;
  }
  showDate();
  function getTimeOfDay () {
    let i = Math.floor(hours/6);
    if (i==1){
      return greeting.textContent = 'Good morning'
    }
    else if(i==2){
      return greeting.textContent = 'Good afternoon'
    }
    else if(i==3){
      return greeting.textContent = 'Good evening'
    }
    else if(i==0){
      return greeting.textContent = 'Good night'
    }
  }
  getTimeOfDay();
});
