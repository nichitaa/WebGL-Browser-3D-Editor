import {Shape} from "./Shape.js";
import {calculateNormalsForObject} from "../myUtils/calculateNormalsForObject.js";

export class Sphere extends Shape {
    constructor() {
        super();
        this.attributes = {
            aColor: {
                size: 3,
                offset: 0,
                bufferData: null,
            },
            aPosition: {
                size: 3,
                offset: 0,
                bufferData: null,
            },
            aNormal: {
                size: 4,
                offset: 0,
                bufferData: null,
            }
        };
        this.indices = null;
        this.state = {
            mm: mat4.create(),
        }
        this.init = function (_this) {
            const SPHERE_DIV = 15;
            let i, ai, si, ci;
            let j, aj, sj, cj;
            let p1, p2;

            // Vertices
            let vertices = [], indices = [];
            for (j = 0; j <= SPHERE_DIV; j++) {
                aj = j * Math.PI / SPHERE_DIV;
                sj = Math.sin(aj);
                cj = Math.cos(aj);
                for (i = 0; i <= SPHERE_DIV; i++) {
                    ai = i * 2 * Math.PI / SPHERE_DIV;
                    si = Math.sin(ai);
                    ci = Math.cos(ai);

                    vertices.push(si * sj);  // X
                    vertices.push(cj);       // Y
                    vertices.push(ci * sj);  // Z
                }
            }
            let SphColors = [];
            for (let i = 0; i < vertices.length / 3; i++) {
                SphColors.push(1.0, 0.0, 0.0);
                SphColors.push(1.0, 0.0, 0.0);
                SphColors.push(1.0, 0.0, 0.0);
            }

            // Indices
            for (j = 0; j < SPHERE_DIV; j++) {
                for (i = 0; i < SPHERE_DIV; i++) {
                    p1 = j * (SPHERE_DIV + 1) + i;
                    p2 = p1 + (SPHERE_DIV + 1);

                    indices.push(p1);
                    indices.push(p2);
                    indices.push(p1 + 1);

                    indices.push(p1 + 1);
                    indices.push(p2);
                    indices.push(p2 + 1);
                }
            }
            // update buffers::::::::::::
            _this.attributes.aPosition.bufferData = new Float32Array(vertices);
            _this.attributes.aColor.bufferData = new Float32Array(SphColors);
            _this.indices = new Uint8Array(indices);

            // calculate normals::::::::
            let normals = [];
            normals = calculateNormalsForObject(indices, vertices)
            _this.attributes.aNormal.bufferData = new Float32Array(normals)


        }(this);
    };
}