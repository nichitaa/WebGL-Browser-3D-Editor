import { sceneParameters } from "../state.js";

export function initWebGL() {
    // set the canvas "background" color
    // sceneParameters.gl.clearColor(0.89, 0.949, 0.992, 1.0);
    sceneParameters.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // enable depth test, to render correctly 3d objects
    sceneParameters.gl.enable(sceneParameters.gl.DEPTH_TEST);
    // tell webgl which program to use
    sceneParameters.gl.useProgram(sceneParameters.program);
}