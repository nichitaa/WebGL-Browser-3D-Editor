import {sceneParameters} from "../state.js";

export function initShaders() {
    // init shaders from shader source folder
    let vertexShader = glUtils.getShader(sceneParameters.gl, sceneParameters.gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(sceneParameters.gl, sceneParameters.gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    // create&link program
    sceneParameters.program = glUtils.createProgram(sceneParameters.gl, vertexShader, fragmentShader);
}