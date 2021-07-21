import document from "document";
import { me } from "appbit";
import { today } from "user-activity";
import { goals } from "user-activity";
import { modes } from "./modes";

class Goals {
    settings;
    stepPercent = 0;
    distancePercent = 0;
    zonePercent = 0;
    
    constructor(settings) {
        this.settings = settings;
    }

    updateGoals(mode) {
        if (me.permissions.granted("access_activity")) {
            var statsArc = document.getElementById("statsArc");
            var angle = 0;
            
            if (mode == modes.Steps) {
                var stepCount = today.adjusted.steps;
                var stepGoal = goals.steps;
                this.stepPercent = stepCount / stepGoal * 100;
                angle = 360 * (stepCount / stepGoal);
            }
            else if (mode == modes.Distance) {
                var distanceCount = today.adjusted.distance;
                var distanceGoal = goals.distance;
                this.distancePercent = distanceCount / distanceGoal * 100;
                angle = 360 * (distanceCount / distanceGoal);
            }
            else if (mode == modes.Zone) {
                var zoneCount = today.adjusted.activeZoneMinutes.total;
                var zoneGoal = goals.activeZoneMinutes.total;
                this.zonePercent = zoneCount / zoneGoal * 100;
                angle = 360 * (zoneCount / zoneGoal);
            }
            if (mode == modes.Steps || mode == modes.Distance || mode == modes.Zone)
            { 
                angle = Math.round(angle);
                if (angle > 360) angle = 360;
                statsArc.sweepAngle = angle;
                console.log("Goals Updated");
            }
        }
      
        if (!this.settings.hideGoals) {}
    }
}

export default Goals;