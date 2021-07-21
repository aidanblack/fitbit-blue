import clock from "clock";
import document from "document";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me } from "appbit";
import * as messaging from "messaging";
import * as simpleSettings from "./device-settings";
import Clock from "./clock";
import Battery from "./battery";
import Weather from "./weather";
import Face from "./face";
import Goals from "./goals";
import { FitFont } from "fitfont";
import { modes } from "./modes";

// ***** Settings *****
console.log("set up settings");

const settings;

function settingsCallback(data) {
  settings = data;
}

simpleSettings.initialize(settingsCallback);

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt && evt.data && evt.data.key) {
    settings[evt.data.key] = evt.data.value;
    //console.log(`${evt.data.key} : ${evt.data.value}`); // Good for debugging
    if (evt.data.key === "tempUnit") {
      weather.tempUnit = evt.data.value.selected;
      clockController.weather.updateWeather();
    }
  }
});

// ***** Clock *****
console.log("set up clock");

const dateMonth = new FitFont({ 
  id:'dateMonth',
  font:'Futura_24',

  // Optional
  halign: 'middle',
  valign: 'baseline',
  letterspacing: -1
});
const dateDay = new FitFont({ 
  id:'dateDay',
  font:'Futura_24',

  // Optional
  halign: 'middle',
  valign: 'baseline',
  letterspacing: -1
});
const hourHand = document.getElementById("hours");
const minuteHand = document.getElementById("minutes");
const secondsHand = document.getElementById("seconds");
const hourShadow = document.getElementById("hourShadow");
const minuteShadow = document.getElementById("minuteShadow");
const secondShadow = document.getElementById("secondShadow");

var clockController = new Clock(
  dateMonth,
  dateDay,
  hourHand,
  minuteHand,
  secondsHand,
  hourShadow,
  minuteShadow,
  secondShadow
);

clockController.mode = modes.Battery;

// ***** Initialize Body & Heart Rate *****
console.log("initialize body and heart rate");

const heartRate = document.getElementById("heartRate");
const body = null;
const hrm;

function processHeartRate() {
  if (clockController.mode == modes.HeartRate) {
    heartRate.animate("enable");
    var current = hrm.heartRate ?? 0;
    var max = 220;
    var angle = 360 * (current / max);
    angle = Math.round(angle);
    if (angle > 360) angle = 360;
    document.getElementById("statsArc").sweepAngle = angle;
  }
}

function processBodyPresence() {
  if (!settings.hideHeartRate && display.on && body.present) {
    hrm.start();
  } else {
    hrm.stop();
  }
}

if (HeartRateSensor) {
  hrm = new HeartRateSensor({ frequency: 5 });
  hrm.addEventListener("reading", () => {
    processHeartRate();
  });
}

if (BodyPresenceSensor) {
  body = new BodyPresenceSensor();
  body.start();
  body.addEventListener("reading", () => {
    processBodyPresence();
  });
}

// ***** Display *****
console.log("set up display");

var face = new Face(settings, body, hrm, dateMonth, dateDay);

if (display.aodAvailable && me.permissions.granted("access_aod")) {
  // tell the system we support AOD
  display.aodAllowed = true;

  // respond to display change events
  display.addEventListener("change", () => {
    // Is the display on?
    if (!display.aodActive && display.on) {
      hrm.start();
      body.start();
      clock.granularity = "seconds";
      clockController.weather.updateWeather();
    }
    else {
      hrm.stop();
      body.stop();
      clock.granularity = "minutes";
    }
    processHeartRate();
    face.updateDisplay(clockController.mode);
  });
}
else {
  // respond to display change events
  display.addEventListener("change", () => {
    // Is the display on?
    if (display.on) {
      hrm.start();
      body.start();
      clock.granularity = "seconds";
      clockController.weather.updateWeather();
    }
    else {
      hrm.stop();
      body.stop();
      clock.granularity = "minutes";
    }
    processHeartRate();
    face.updateDisplay(clockController.mode);
  });
}

clockController.updateDisplay = (mode) => { face.updateDisplay(mode) };

const smallRing3 = document.getElementById("smallRing3");
smallRing3.addEventListener("click", (evt) => {
  clockController.mode = face.switchMode(clockController.mode);
  clockController.updateGoals(clockController.mode);
  clockController.updateBattery(clockController.mode);
  clockController.updateDisplay(clockController.mode);
  
  console.log(JSON.stringify(clockController.mode));
});

// ***** Weather *****
console.log("set up weather");

const temperature = new FitFont({ 
  id:'temperature',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font:'Futura_24', // name of the generated font folder

  // Optional
  halign: 'middle',            // horizontal alignment : start / middle / end
  valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
  letterspacing: -2            // letterspacing...
});

var weather = new Weather(temperature, document.getElementById("weatherIcon"));
try {
  weather.tempUnit = settings.tempUnit.selected || "Celsius";
}
catch (err) {
  console.log(err);
  weather.tempUnit = "Celsius";
}
clockController.weather = weather;

// ***** Goals *****
console.log("set up goals");

var goals = new Goals(settings);

clockController.updateGoals = (mode) => { goals.updateGoals(mode) };

// ***** Battery *****
console.log("set up battery");

var battery = new Battery();

clockController.updateBattery = (mode) => { battery.updateBattery(mode) };

// ***** Trigger Updates *****
console.log("start updates");

clockController.updateGoals(clockController.mode);
clockController.updateBattery(clockController.mode);
clockController.startClock();
