import * as weather from 'fitbit-weather/app';
import document from "document";

class Weather {
    tempUnit = "0";
    timestamp = 0;

    constructor(temp, icon) {
        this.temp = temp;
        this.icon = icon;
        this.sunset = document.getElementById("sunset");
    }

    processWeather(weather) {
        if (this.tempUnit == "1")
            this.temp.text = `${Math.round(weather.temperatureF)}°`;
        else
            this.temp.text = `${Math.round(weather.temperatureC)}°`;
        var weatherIcon = this.icon;
        var weatherCode = weather.conditionCode;
        var dayNight;
        if (weather.timestamp > weather.sunrise && weather.timestamp < weather.sunset) dayNight = "d";
        else dayNight = "n";
        weatherIcon.href = `weather/${weatherCode}${dayNight}.png`;
        this.timestamp = weather.timestamp;

        var sunriseTime = new Date(weather.sunrise);
        var sunsetTime = new Date(weather.sunset);
    
        var sunriseHours = sunriseTime.getHours();
        var sunriseMinutes = sunriseTime.getMinutes();
        var sunsetHours = sunsetTime.getHours();
        var sunsetMinutes = sunsetTime.getMinutes();
    
        var sunriseAngle = ((360 / 24) * sunriseHours) + ((360 / 24 / 60) * sunriseMinutes);
        var sunsetAngle = ((360 / 24) * sunsetHours) + ((360 / 24 / 60) * sunsetMinutes);
        this.sunset.startAngle = 180 - sunriseAngle;
        this.sunset.sweepAngle = 360 - sunsetAngle + sunriseAngle;

        var timestampDate = new Date(this.timestamp);
        let hours = timestampDate.getHours();
        let minutes = timestampDate.getMinutes();
        var rotateAngle = ((360 / 24) * hours) + ((360 / 24 / 60) * minutes);
        document.getElementById("sunlight").groupTransform.rotate.angle = 180 + rotateAngle;

        console.log("Weather Updated");
    }

    updateWeather() {
        weather.fetch(30 * 60 * 1000) // return the cached value if it is less than 30 minutes old 
        .then(weather => this.processWeather(weather))
        .catch(error => console.log(JSON.stringify(error)));
    }
}
  
export default Weather;
