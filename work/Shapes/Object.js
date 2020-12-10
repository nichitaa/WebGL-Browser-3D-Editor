import {Shape} from "./Shape.js";
import {calculateNormalsForObject} from "../myUtils/calculateNormalsForObject.js";

export class Obj extends Shape {
    constructor(v, vn, i) {
        super();
        this.attributes = {
            aColor: {
                size:4,
                offset:0,
                // color buffer (random colors)
                bufferData: null,
            },
            aPosition: {
                size:4,
                offset:0,
                bufferData: null,
            },
            aNormal: {
                size: 4,
                offset: 0,
                bufferData: null,
            }
        };
        this.indices = new Uint8Array(i);
        this.state = {
            mm: mat4.create(),
        };
        this.init = function (_this) {
            let verts = []
            v.forEach(i => {
                i.forEach(id => {
                    verts.push(id)
                })
            })
            _this.attributes.aPosition.bufferData = new Float32Array(verts);

            let colors = [];
            for (let i = 0; i<v.length * 3; i++) {
                colors.push(Math.random(), Math.random(), Math.random(), 1.0,)
            }
            _this.attributes.aColor.bufferData = new Float32Array(colors);

            // get the normals
            const normals = calculateNormalsForObject(i, verts)
            _this.attributes.aNormal.bufferData = new Float32Array(normals); // set the normals
        }(this);
    };
}