import {Shape} from "./Shape.js";
import {calculateNormalsForObject} from "../myUtils/calculateNormalsForObject.js";

export class Cone extends Shape{
    constructor() {
        super();
        this.attributes = {
            aColor: {
                size: 4,
                offset: 0,
                bufferData: new Float32Array([
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
                    Math.random(), Math.random(), Math.random(), 1.0,
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
                size: 4,
                offset: 0,
                bufferData: new Float32Array([
                    0.0, 2.0, 0.0, 1.0,  // varful
                    0.0, 0.0, 0.0, 1.0,
                    0.0, 0.0, 0.9, 1.0,
                    0.4, 0.0, 0.8, 1.0,
                    0.8, 0.0, 0.4, 1.0,
                    0.9, 0.0, 0.0, 1.0,
                    0.8, 0.0, -0.4, 1.0,
                    0.4, 0.0, -0.8, 1.0,
                    0.0, 0.0, -0.9, 1.0,
                    -0.4, 0.0, -0.8, 1.0,
                    -0.8, 0.0, -0.4, 1.0,
                    -0.9, 0.0, 0.0, 1.0,
                    0.0, 0.0, 0.9, 1.0,
                    -0.4, 0.0, 0.8, 1.0,
                    -0.8, 0.0, 0.4, 1.0,
                    -0.9, 0.0, 0.0, 1.0,
                ]),
            },
            aNormal: {
                size: 4,
                offset: 0,
                bufferData: null,
            }
        };
        this.indices = new Uint8Array([
            2, 3, 0,
            2, 3, 1,
            3, 4, 0,
            3, 4, 1,
            4, 5, 0,
            4, 5, 1,
            5, 6, 0,
            5, 6, 1,
            6, 7, 0,
            6, 7, 1,
            7, 8, 0,
            7, 8, 1,
            8, 9, 0,
            8, 9, 1,
            9, 10, 0,
            9, 10, 1,
            10, 11, 0,
            10, 11, 1,
            12, 13, 0,
            12, 13, 1,
            13, 14, 0,
            13, 14, 1,
            14, 15, 0,
            14, 15, 1,
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
    };
}