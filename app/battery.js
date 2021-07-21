import document from "document";
import { battery } from "power";
import { modes } from "./modes";

class Battery {

    constructor() {}

    updateBattery(mode) {
        if (mode == modes.Battery) {
            var current = battery.chargeLevel;
            var goal = 100;
            var angle = 360 * (current / goal);
            angle = Math.round(angle);
            if (angle > 360) angle = 360;
            document.getElementById("statsArc").sweepAngle = angle;
            console.log("Battery Updated");
        }
    }
}

export default Battery;