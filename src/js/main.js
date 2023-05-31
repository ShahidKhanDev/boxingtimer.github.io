const countdownElem = document.querySelector(".countdown");
const countdownTime = document.querySelector(".countdown__time");
const startCountDownBtn = document.querySelector(".btn__start__ctdown");
const stopCountDownBtn = document.querySelector(".btn__stop__ctdown");
const resetCountDownBtn = document.querySelector(".btn__reset__ctdown");
const startMinutesElem = document.querySelector("#startMinutes");
const startSecondsElem = document.querySelector("#startSeconds");
let startMinutes = parseInt(document.getElementById("startMinutes").value);
let startSeconds = parseInt(document.getElementById("startSeconds").value);
const splashScreen = document.querySelector(".splash__screen");
const timerSection = document.querySelector(".timer__section");
const settingsBtn = document.querySelector(".btn__settings");
const settingsSection = document.querySelector(".settings__section");
const closeSettingsBtn = document.querySelector(".close__settings__btn");
const saveSettingsBtn = document.querySelector(".btn__save__settings");

let localStrMin = +localStorage.getItem("min");
let localStrSec = +localStorage.getItem("sec");

startMinutes = localStrMin;
startSeconds = localStrSec;

startMinutesElem.value = localStrMin;
startSecondsElem.value = localStrSec;

let interval;
let totalSeconds = 0;
let isPaused = true;
let remainingSeconds = 0;

function startCountDown(minutes, seconds) {
  if (isPaused && remainingSeconds === 0) {
    totalSeconds = minutes * 60 + seconds;
    remainingSeconds = totalSeconds;
    updateCountdown(Math.floor(remainingSeconds / 60), remainingSeconds % 60); // Update countdown immediately
  }
  isPaused = false;

  clearInterval(interval); // Clear existing interval
  interval = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      console.log("Countdown finished!");
    } else {
      if (!isPaused) {
        remainingSeconds--;
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        updateCountdown(mins, secs);
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
}

function stopTimer() {
  clearInterval(interval);
  totalSeconds = 0;
  remainingSeconds = 0;
  updateCountdown(startMinutes, startSeconds);
}

function updateCountdown(minutes, seconds) {
  countdownTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

startCountDownBtn.addEventListener("click", () => {
  const startCountDownBtnIcon = startCountDownBtn.firstElementChild;

  if (isPaused) {
    startCountDown(startMinutes, startSeconds);
    startCountDownBtnIcon.classList.replace("ri-play-fill", "ri-pause-fill");
  } else {
    pauseTimer();
    startCountDownBtnIcon.classList.replace("ri-pause-fill", "ri-play-fill");
  }
});

stopCountDownBtn.addEventListener("click", stopTimer);

window.addEventListener("load", () => {
  setTimeout(() => {
    splashScreen.classList.add("hide");

    splashScreen.addEventListener("transitionend", () => {
      document.body.removeChild(splashScreen);
      timerSection.classList.add("active");
    });
  }, 2000);
  localStorage.setItem("min", startMinutes);
  localStorage.setItem("sec", startSeconds);
});

window.addEventListener("DOMContentLoaded", () => {
  countdownTime.textContent = `${startMinutes
    .toString()
    .padStart(2, "0")}:${startSeconds.toString().padStart(2, "0")}`;
});

settingsBtn.addEventListener("click", () => {
  timerSection.classList.remove("active");
  settingsSection.classList.add("active");
});

closeSettingsBtn.addEventListener("click", () => {
  timerSection.classList.add("active");
  settingsSection.classList.remove("active");
});

saveSettingsBtn.addEventListener("click", () => {
  const minValue = startMinutesElem.value;
  const secValue = startSecondsElem.value;

  localStorage.setItem("min", minValue);
  localStorage.setItem("sec", secValue);
});
