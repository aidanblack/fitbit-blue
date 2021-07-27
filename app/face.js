import { display } from "display";
import document from "document";
import { modes } from "./modes";

class Face {
    settings;
    body;
    hrm;

    constructor(settings) {
        this.settings = settings;
    }

    updateDisplay(mode) {
        // Is AOD inactive and the display is on?
        if (!display.aodActive && display.on) {}
        else {}
      
        // Date
        if (!this.settings.hideDate) {}
        else if (this.settings.hideDate && !display.aodActive && display.on) {}
        else {}
      
        // Weather
        if (!this.settings.hideWeather && !display.aodActive && display.on) {}
        else if (this.settings.hideWeather && !display.aodActive && display.on) {}
        else {}
      
        // Heart Rate
        if (!this.settings.hideHeartRate && !display.aodActive && display.on) {}
        else if (this.settings.hideHeartRate && !display.aodActive && display.on) {}
        else {}

        if (!this.settings.hideHeartRate && !display.aodActive && display.on && this.body.present) {}
        else {}
      
        // Goals
        if (!this.settings.hideGoals && !display.aodActive && display.on) {}
        else {}
      
        if (this.settings.hideGoals) {}
        else {}

        var statsArc = document.getElementById("statsArc");
        if (mode == modes.Battery)
        {
            document.getElementById("zoneIcon").style.visibility = "hidden";
            document.getElementById("batteryIcon").style.visibility = "visible";
            statsArc.style.fill = "#3FD300";
        }
        if (mode == modes.HeartRate)
        {
            document.getElementById("batteryIcon").style.visibility = "hidden";
            document.getElementById("heartIcon").style.visibility = "visible";
            statsArc.style.fill = "#D3003F";
            if (this.body.present) this.hrm.start();
        }
        else if (mode == modes.Steps)
        {
            document.getElementById("heartIcon").style.visibility = "hidden";
            document.getElementById("stepsIcon").style.visibility = "visible";
            statsArc.style.fill = "#EFC12B";
        }
        else if (mode == modes.Distance)
        {
            document.getElementById("stepsIcon").style.visibility = "hidden";
            document.getElementById("distanceIcon").style.visibility = "visible";
            statsArc.style.fill = "#376EEF";
        }
        else if (mode == modes.Zone)
        {
            document.getElementById("distanceIcon").style.visibility = "hidden";
            document.getElementById("zoneIcon").style.visibility = "visible";
            statsArc.style.fill = "#EA7D1E";
        }
    }

    switchMode(mode) {
        if (mode === modes.Battery) return modes.HeartRate;
        if (mode === modes.HeartRate) return modes.Steps;
        if (mode === modes.Steps) return modes.Distance;
        if (mode === modes.Distance) return modes.Zone;
        if (mode === modes.Zone) return modes.Battery;
    }

    switchColor(color) {
        if (color == 0) document.getElementsByClassName("faceColor").forEach((item) => {item.style.fill = "#145986"});
        if (color == 1) document.getElementsByClassName("faceColor").forEach((item) => {item.style.fill = "#116b20"});
        if (color == 2) document.getElementsByClassName("faceColor").forEach((item) => {item.style.fill = "#791212"});
        if (color == 3) document.getElementsByClassName("faceColor").forEach((item) => {item.style.fill = "#333333"});
        if (color == 4) document.getElementsByClassName("faceColor").forEach((item) => {item.style.fill = "#6e2f06"});
    }

    switchShape(shape) {
        if (shape == 0) {
            document.getElementsByClassName("square").forEach((item) => {item.style.visibility = "hidden"});
            document.getElementsByClassName("circle").forEach((item) => {item.style.visibility = "visible"});
            document.getElementById("weatherBox").groupTransform.translate.y = 40;
            document.getElementById("icons").groupTransform.translate.y = 40;
        }
        if (shape == 1) {
            document.getElementsByClassName("circle").forEach((item) => {item.style.visibility = "hidden"});
            document.getElementsByClassName("square").forEach((item) => {item.style.visibility = "visible"});
            document.getElementById("weatherBox").groupTransform.translate.y = 50;
            document.getElementById("icons").groupTransform.translate.y = 50;
        }
    }
}

export default Face;