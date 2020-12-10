// keys events
import {sceneParameters} from "../state.js";

// init listener
export function initCallbacks() {
    document.onkeydown = keydown;
    document.onkeyup = keyup;
}

function keydown(event) {
    sceneParameters.ui.pressedKeys[event.keyCode] = true;
}
function keyup(event) {
    sceneParameters.ui.pressedKeys[event.keyCode] = false;
}