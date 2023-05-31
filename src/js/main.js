const countdownElem = document.querySelector(".countdown");
const countdownTime = document.querySelector(".countdown__time");
const totalTimeElem = document.querySelector(".total__time");
const startCountDownBtn = document.querySelector(".btn__start__ctdown");
const startCountDownBtnIcon = startCountDownBtn.firstElementChild;
const stopCountDownBtn = document.querySelector(".btn__stop__ctdown");
const resetCountDownBtn = document.querySelector(".btn__reset__ctdown");
const roundsInput = document.querySelector("#totalRounds");
const startMinutesInput = document.querySelector("#startMinutes");
const startSecondsInput = document.querySelector("#startSeconds");
let rounds = document.getElementById("totalRounds").value;
let startMinutes = parseInt(document.getElementById("startMinutes").value);
let startSeconds = parseInt(document.getElementById("startSeconds").value);
const splashScreen = document.querySelector(".splash__screen");
const timerSection = document.querySelector(".timer__section");
const settingsBtn = document.querySelector(".btn__settings");
const settingsSection = document.querySelector(".settings__section");
const closeSettingsBtn = document.querySelector(".close__settings__btn");
const saveSettingsBtn = document.querySelector(".btn__save__settings");

// countdown cards
const totalRounds = document.querySelector(".total__rounds");
const roundTime = document.querySelector(".round__time");
const restTime = document.querySelector(".rest__time");

let localStrMin = +localStorage.getItem("min");
let localStrSec = +localStorage.getItem("sec");
let localStrRounds = +localStorage.getItem("rounds");

startMinutes = localStrMin;
startSeconds = localStrSec;
rounds = localStrRounds;

startMinutesInput.value = localStrMin;
startSecondsInput.value = localStrSec;
roundsInput.value = localStrRounds;

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
  startCountDownBtnIcon.classList.replace("ri-pause-fill", "ri-play-fill");
  updateCountdown(startMinutes, startSeconds);
}

function updateCountdown(minutes, seconds) {
  countdownTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function updateRoundTime(minutes, seconds) {
  roundTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startRestCountDown() {
  console.log("Resting...");
}

function loadSettingsFromLocalStorage() {
  const localStrMin = +localStorage.getItem("min");
  const localStrSec = +localStorage.getItem("sec");

  startMinutes = localStrMin;
  startSeconds = localStrSec;

  startMinutesInput.value = localStrMin;
  startSecondsInput.value = localStrSec;
}

function saveSettingsToLocalStorage(minutes, seconds) {
  localStorage.setItem("min", minutes);
  localStorage.setItem("sec", seconds);
}

startCountDownBtn.addEventListener("click", () => {
  if (isPaused) {
    startMinutes = +localStorage.getItem("min");
    startSeconds = +localStorage.getItem("sec");

    startCountDown(startMinutes, startSeconds);
    startCountDownBtnIcon.classList.replace("ri-play-fill", "ri-pause-fill");
  } else {
    pauseTimer();
    startCountDownBtnIcon.classList.replace("ri-pause-fill", "ri-play-fill");
  }
});

stopCountDownBtn.addEventListener("click", stopTimer);

window.addEventListener("load", () => {
  //   setTimeout(() => {
  //     splashScreen.classList.add("hide");

  //     splashScreen.addEventListener("transitionend", () => {
  //       document.body.removeChild(splashScreen);
  //       timerSection.classList.add("active");
  //     });
  //   }, 2000);

  splashScreen.classList.add("hide");

  splashScreen.addEventListener("transitionend", () => {
    document.body.removeChild(splashScreen);
    timerSection.classList.add("active");
  });

  //   localStorage.setItem("min", startMinutes);
  //   localStorage.setItem("sec", startSeconds);

  saveSettingsToLocalStorage(startMinutes, startSeconds);
  localStorage.setItem("rounds", rounds);
});

window.addEventListener("DOMContentLoaded", () => {
  countdownTime.textContent = `${startMinutes
    .toString()
    .padStart(2, "0")}:${startSeconds.toString().padStart(2, "0")}`;

  roundTime.textContent = `${startMinutes
    .toString()
    .padStart(2, "0")}:${startSeconds.toString().padStart(2, "0")}`;

  totalTimeElem.innerHTML = `<span>Total Time:</span> ${startMinutes}<small>mins</small> - ${startSeconds}<small>secs</small>`;
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
  let minValue = startMinutesInput.value;
  let secValue = startSecondsInput.value;
  let roundValue = roundsInput.value;

  saveSettingsToLocalStorage(minValue, secValue);
  localStorage.setItem("rounds", roundValue);
  updateCountdown(minValue, secValue);

  // Update startMinutes and startSeconds with the new values
  startMinutes = +minValue;
  startSeconds = +secValue;

  if (isPaused) {
    remainingSeconds = startMinutes * 60 + startSeconds;
    updateCountdown(startMinutes, startSeconds);
  }
  updateRoundTime(minValue, secValue);
  totalTimeElem.innerHTML = `<span>Total Time:</span> ${startMinutes}<small>mins</small> - ${startSeconds}<small>secs</small>`;
});

// Load settings from localStorage when the page loads
loadSettingsFromLocalStorage();
