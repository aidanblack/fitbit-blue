import document from "document";
import { me } from "appbit";
import { today } from "user-activity";
import { goals } from "user-activity";

class Goals {
    settings;
    stepPercent = 0;
    distancePercent = 0;
    zonePercent = 0;
    
    constructor(settings) {
        this.settings = settings;
    }

    updateGoals() {
        if (me.permissions.granted("access_activity")) {
          var stepCount = today.adjusted.steps;
          var stepGoal = goals.steps;
          this.stepPercent = stepCount / stepGoal * 100;
      
          var distanceCount = today.adjusted.distance;
          var distanceGoal = goals.distance;
          this.distancePercent = distanceCount / distanceGoal * 100;
      
          var zoneCount = today.adjusted.activeZoneMinutes.total;
          var zoneGoal = goals.activeZoneMinutes.total;
          this.zonePercent = zoneCount / zoneGoal * 100;
        }
      
        if (!this.settings.hideGoals) {}
        console.log("Goals Updated");
    }
}

export default Goals;