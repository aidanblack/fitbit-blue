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
        if (color == 0) document.getElementById("faceBlue").style.visibility = "visible";
        else document.getElementById("faceBlue").style.visibility = "hidden";
        if (color == 1) document.getElementById("faceGreen").style.visibility = "visible";
        else document.getElementById("faceGreen").style.visibility = "hidden";
        if (color == 2) document.getElementById("faceRed").style.visibility = "visible";
        else document.getElementById("faceRed").style.visibility = "hidden";
        if (color == 3) document.getElementById("faceGrey").style.visibility = "visible";
        else document.getElementById("faceGrey").style.visibility = "hidden";
    }
}

export default Face;