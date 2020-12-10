import { sceneParameters } from "../state.js";

export class Shape {
    // translation
    translation = {
        x:0,
        y:0,
        z:0,
    };
    translationMatrix = new Float32Array ([
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        this.translation.x,this.translation.y,this.translation.z,1
    ]);
    uTranslationMatrix = sceneParameters.gl.getUniformLocation(sceneParameters.program, 'uTranslationMatrix');

    // scale
    scale = {
        x:1,
        y:1,
        z:1,
    };
    scaleMatrix =  new Float32Array([
        this.scale.x,    0.0,             0.0,             0.0,
        0.0,             this.scale.y,    0.0,             0.0,
        0.0,             0.0,             this.scale.z,    0.0,
        0.0,             0.0,             0.0,             1.0
    ]);
    uScaleMatrix = sceneParameters.gl.getUniformLocation(sceneParameters.program, 'uScaleMatrix');

    // rotation
    axis = 0;
    theta = [ 0, 0, 0 ];
    xAxis = 0;
    yAxis = 1;
    zAxis = 2;
    thetaLoc = sceneParameters.gl.getUniformLocation(sceneParameters.program, "theta");
    direction = true;
    toggleSpin = false;
    constructor() {
        // for translation
        sceneParameters.gl.uniformMatrix4fv(this.uTranslationMatrix, false, this.translationMatrix);

        // for scaling
        sceneParameters.gl.uniformMatrix4fv(this.uScaleMatrix, false, this.scaleMatrix);
    }

    // methods to translate/scale/rotate/toggle rotation direction/toggle rotation
    // similar for each shape
    setTranslationValueY(value) {
        this.translation.y = value;
        this.update();
    }
    setTranslationValueX(value) {
        this.translation.x = value;
        this.update();
    }
    setScaleValueX(value) {
        this.scale.x = value;
        this.update();
    }
    setScaleValueY(value) {
        this.scale.y = value;
        this.update();
    }
    setScaleValueZ(value) {
        this.scale.z = value;
        this.update();
    }
    setAxis(axis) {
        if (axis === "x") {
            this.axis = this.xAxis;
        } else if (axis === "y") {
            this.axis = this.yAxis;
        } else if (axis === "z") {
            this.axis = this.zAxis;
        }
    }
    setDirection(bool) {
        this.direction = bool;
    }
    setToggleSpin(bool) {
        this.toggleSpin = bool;
    }

    // update the translation/scale matrices
    update() {
        this.translationMatrix = ([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            this.translation.x,this.translation.y,this.translation.z,1
        ]);
        this.scaleMatrix = ([
            this.scale.x,    0.0,             0.0,             0.0,
            0.0,             this.scale.y,    0.0,             0.0,
            0.0,             0.0,             this.scale.z,    0.0,
            0.0,             0.0,             0.0,             1.0
        ]);
    }
}