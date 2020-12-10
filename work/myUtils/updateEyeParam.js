import {sceneParameters} from "../state.js";

export function updateEyeParam() {
    let speed = 0.1;
    if (sceneParameters.ui.pressedKeys[37]) {
        // left
        sceneParameters.app.eye.x += speed;
    } else if (sceneParameters.ui.pressedKeys[39]) {
        // right
        sceneParameters.app.eye.x -= speed;
    } else if (sceneParameters.ui.pressedKeys[40]) {
        // down
        sceneParameters.app.eye.y += speed;
    } else if (sceneParameters.ui.pressedKeys[38]) {
        // up
        sceneParameters.app.eye.y -= speed;
    }
}