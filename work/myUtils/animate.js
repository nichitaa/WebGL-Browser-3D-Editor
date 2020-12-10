// Animate / Update eye values by keystroke / Draw function
import {sceneParameters} from "../state.js";
import {updateEyeParam} from "./updateEyeParam.js";
import {draw} from "./draw.js";

export function animate() {
    sceneParameters.animation.tick = function() {
        updateEyeParam(); // update when up-down left-right keys are pressed
        draw(); // draw
        requestAnimationFrame(sceneParameters.animation.tick); // recursively call tick
    };
    sceneParameters.animation.tick();
}