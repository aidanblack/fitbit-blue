import clock from "clock";
import { display } from "display";
import document from "document";
import { me } from "appbit";
import * as messaging from "messaging";
import * as simpleSettings from "./device-settings";
import Clock from "./clock";
import Battery from "./battery";
import Body from "./body";
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

var clockController = new Clock();

clockController.mode = modes.Battery;

// ***** Initialize Body & Heart Rate *****
console.log("initialize body and heart rate");

var body = new Body(settings);
body.mode = clockController.mode;

// ***** Display *****
console.log("set up display");

var face = new Face(settings);

if (display.aodAvailable && me.permissions.granted("access_aod")) {
  // tell the system we support AOD
  display.aodAllowed = true;

  // respond to display change events
  display.addEventListener("change", () => {
    // Is the display on?
    if (!display.aodActive && display.on) {
      body.hrm.start();
      body.body.start();
      clock.granularity = "seconds";
      clockController.weather.updateWeather();
    }
    else {
      body.hrm.stop();
      body.body.stop();
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
      body.hrm.start();
      body.body.start();
      clock.granularity = "seconds";
      clockController.weather.updateWeather();
    }
    else {
      body.hrm.stop();
      body.body.stop();
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
  body.mode = clockController.mode;
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

body.initializeBody();
face.body = body.body;
face.hrm = body.hrm;
clockController.updateGoals(clockController.mode);
clockController.updateBattery(clockController.mode);
clockController.startClock();
