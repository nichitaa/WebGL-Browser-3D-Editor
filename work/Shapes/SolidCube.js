import {Shape} from "./Shape.js";
import {calculateNormalsForObject} from "../myUtils/calculateNormalsForObject.js";

// A Cube with solid colored faces
export class SolidCube extends Shape{
    constructor() {
        super();
        this.attributes = {
            aColor: {
                size: 4,
                offset: 0,
                // solid colors for each face
                bufferData: new Float32Array([
                    1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,  // v0-v1-v2-v3 front
                    0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,  // v0-v3-v4-v5 right
                    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,  // v0-v5-v6-v1 up
                    1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,  // v1-v6-v7-v2 left
                    0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,  // v7-v4-v3-v2 down
                    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1    // v4-v7-v6-v5 back
                ]),
            },
            aPosition: {
                size: 3,
                offset: 0,
                bufferData: new Float32Array([
                    1.0, 1.0, 1.0,     -1.0, 1.0, 1.0,      -1.0, -1.0, 1.0,      1.0, -1.0, 1.0,  // v0-v1-v2-v3 front
                    1.0, 1.0, 1.0,      1.0, -1.0, 1.0,     1.0, -1.0, -1.0,      1.0, 1.0, -1.0,  // v0-v3-v4-v5 right
                    1.0, 1.0, 1.0,      1.0, 1.0, -1.0,     -1.0, 1.0, -1.0,     -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
                    -1.0, 1.0, 1.0,     -1.0, 1.0, -1.0,     -1.0, -1.0, -1.0,   -1.0, -1.0, 1.0,  // v1-v6-v7-v2 left
                    -1.0, -1.0, -1.0,    1.0, -1.0, -1.0,    1.0, -1.0, 1.0,     -1.0, -1.0, 1.0,  // v7-v4-v3-v2 down
                    1.0, -1.0, -1.0,    -1.0, -1.0, -1.0,   -1.0, 1.0, -1.0,      1.0,  1.0, -1.0   // v4-v7-v6-v5 back
                ]),
            },
            aNormal: {
                size: 4,
                offset: 0,
                bufferData: null,
            }
        };
        this.indices = new Uint8Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ]);
        this.state = {
            mm: mat4.create(),
        };
        this.init = function (_this) {
            let indices = _this.indices;
            let vertices = _this.attributes.aPosition.bufferData;
            // get the normals
            let normals = calculateNormalsForObject(indices, vertices)
            _this.attributes.aNormal.bufferData = new Float32Array(normals);
        }(this);
    }
}