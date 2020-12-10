import { ActiveObject } from "./initState.js";

export function ChangeGradient() {
    let colors = []; // array for new colors
    // complete it with random colors
    for (let j=0; j<ActiveObject.attributes.aPosition.bufferData.length / 3; j++) {
        colors.push(Math.random(), Math.random(), Math.random(), 1.0);
    }
    // update the buffer with newly created data
    ActiveObject.attributes.aColor.bufferData  = new Float32Array (colors);
}