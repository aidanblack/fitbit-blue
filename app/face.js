import { display } from "display";
import document from "document";

class Face {
    settings;
    body;
    hrm;
    dateBox;

    constructor(settings, body, hrm, dateBox) {
        this.settings = settings;
        this.body = body;
        this.hrm = hrm;
        this.dateBox = dateBox;
    }

    updateDisplay() {
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
    }      
}

export default Face;