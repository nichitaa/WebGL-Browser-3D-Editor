import { sceneParameters } from "./state.js";

import { initShaders } from "./myUtils/initShaders.js";
import { initWebGL } from "./myUtils/initWebGL.js";
import { initCallbacks } from "./myUtils/keyEvents.js";
import { initState } from "./myUtils/initState.js";
import { animate } from "./myUtils/animate.js";

(function(global) {

  glUtils.SL.init({ callback:function() { main(); } });
  function main() {

    sceneParameters.canvas = document.getElementById("glcanvas");
    // check if WebGL is available.
    sceneParameters.gl = glUtils.checkWebGL(sceneParameters.canvas, { preserveDrawingBuffer: true });
    initCallbacks(); // listener to keystroke
    initShaders();   // init shaders
    initWebGL();     // init webgl
    initState();    // state
    animate();      // render
  }

})(window || this);

