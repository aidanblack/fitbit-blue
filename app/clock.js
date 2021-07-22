import clock from "clock";
import document from "document";
import { modes } from "./modes";
import { FitFont } from "fitfont";

class Clock {
    updateDisplay = function(mode) {};
    updateBattery = function(mode) {};
    updateGoals = function(mode) {};
    weather;
    mode;

    constructor(dateMonth, dateDay, hourHand, minuteHand, secondHand, hourShadow, minuteShadow, secondShadow) {
        try {
            this.dateMonth = new FitFont({ 
                id:'dateMonth',
                font:'Futura_24',
              
                // Optional
                halign: 'middle',
                valign: 'baseline',
                letterspacing: -1
            });
            this.dateDay = new FitFont({ 
                id:'dateDay',
                font:'Futura_24',
              
                // Optional
                halign: 'middle',
                valign: 'baseline',
                letterspacing: -1
            });
            this.hourHand = document.getElementById("hours");
            this.minuteHand = document.getElementById("minutes");
            this.secondsHand = document.getElementById("seconds");
            this.hourShadow = document.getElementById("hourShadow");
            this.minuteShadow = document.getElementById("minuteShadow");
            this.secondShadow = document.getElementById("secondShadow");
              
            clock.granularity = "seconds";
        }
        catch (err) {
            console.log(err);
        }
    }

    updateTime(now) {
        let hours = now.getHours();
        hours = hours % 12 || 12;
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let currentTimestamp = new Date(now).getTime();

        this.hourHand.groupTransform.rotate.angle = ((360 / 12) * hours) + ((360 / 12 / 60) * minutes);
        this.minuteHand.groupTransform.rotate.angle = (360 / 60) * minutes + ((360 / 60 / 60) * seconds);
        this.secondHand.groupTransform.rotate.angle = seconds * 6;
        this.hourShadow.groupTransform.rotate.angle = ((360 / 12) * hours) + ((360 / 12 / 60) * minutes);
        this.minuteShadow.groupTransform.rotate.angle = (360 / 60) * minutes + ((360 / 60 / 60) * seconds);
        this.secondShadow.groupTransform.rotate.angle = seconds * 6;

        if((clock.granularity === "minutes"  && (minutes + 5) % 5 === 0) || seconds === 0) this.updateGoals(this.mode);
        if((clock.granularity === "minutes"  && (minutes + 5) % 5 === 0) || seconds === 0) this.updateBattery(this.mode);
        if(this.weather.timestamp === 0 || currentTimestamp - this.weather.timestamp > (30 * 60 * 1000)) this.weather.updateWeather();
        //console.log(`${this.weather.timestamp} : ${currentTimestamp}`);

        this.updateDisplay(this.mode);
    }

    updateDate(date) {
        let dateText = date.toLocaleString('default', { month: 'short' }).substring(4, 10);
        this.dateMonth.text = dateText.substring(0,3)
        this.dateDay.text = dateText.substring(4, 6);
    }

    // ***** Add event handler *****
    startClock() {
        clock.ontick = (evt) => {
            let now = evt.date;
            this.updateDate(now);
            this.updateTime(now);
        }
    }
}

export default Clock;
