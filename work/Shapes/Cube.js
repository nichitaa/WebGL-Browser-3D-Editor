import {Shape} from "./Shape.js";
import {calculateNormalsForObject} from "../myUtils/calculateNormalsForObject.js";

// Cube class (Gradient)
export class Cube extends Shape {
    constructor() {
        super(); // get all attributes/methods from Shape class
        // set the attributes specific to this class
        this.attributes = {
            // form shaders:
            aColor: {
                size:4,
                offset:0,
                // color buffer (random colors)
                bufferData: new Float32Array([
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                ]),
            },
            aPosition: {
                size:4,
                offset:0,
                // vertex buffer
                bufferData: new Float32Array([
                    1, 1, 1, 1,
                    -1, 1, 1, 1,
                    -1,-1, 1, 1,
                    1,-1, 1, 1,
                    1,-1,-1, 1,
                    1, 1,-1, 1,
                    -1, 1,-1, 1,
                    -1,-1,-1, 1,
                ]),
            },
            aNormal: {
                size: 4,
                offset: 0,
                bufferData: null,
            }
        };
        // indices which form a triangle
        this.indices = new Uint8Array([
            0, 1, 2,   0, 2, 3,    // front
            0, 3, 4,   0, 4, 5,    // right
            0, 5, 6,   0, 6, 1,    // up
            1, 6, 7,   1, 7, 2,    // left
            7, 4, 3,   7, 3, 2,    // down
            4, 7, 6,   4, 6, 5,    // back
        ]);
        // new modelMatrix for each object
        this.state = {
            mm: mat4.create(),
        };
        this.init = function (_this) {
            const indices = _this.indices;
            const vertices = _this.attributes.aPosition.bufferData;
            // get the normals
            const normals = calculateNormalsForObject(indices, vertices)
            _this.attributes.aNormal.bufferData = new Float32Array(normals);
        }(this);
    };
}