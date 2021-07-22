import { display } from "display";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { modes } from "./modes";

class Body {
    heartRate;
    body;
    hrm;
    mode;

    constructor(settings) {
        this.heartRate = document.getElementById("heartRate");
        this.body = null;
        this.hrm = null;
        this.settings = settings;
    }

    processHeartRate() {
        if (this.mode == modes.HeartRate) {
          this.heartRate.animate("enable");
          var current = this.hrm.heartRate ?? 0;
          var max = 220;
          var angle = 360 * (current / max);
          angle = Math.round(angle);
          if (angle > 360) angle = 360;
          document.getElementById("statsArc").sweepAngle = angle;
        }
    }
      
    processBodyPresence() {
        if (!this.settings.hideHeartRate && display.on && this.body.present) {
          this.hrm.start();
        } else {
          this.hrm.stop();
          if(this.mode == modes.HeartRate)
            document.getElementById("statsArc").sweepAngle = 0;
        }
    }
    
    initializeBody() {
        if (HeartRateSensor) {
            this.hrm = new HeartRateSensor({ frequency: 1, batch: 5 });
            this.hrm.addEventListener("reading", () => {
              this.processHeartRate();
            });
        }
          
        if (BodyPresenceSensor) {
            this.body = new BodyPresenceSensor();
            this.body.start();
            this.body.addEventListener("reading", () => {
              this.processBodyPresence();
            });
          }
    }
}

export default Body;