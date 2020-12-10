
export function calculateNormalsForObject(indices, vertices) {
    let normals = [];
    let normalsArray = []; // actual normals
    for(let i = 0; i<indices.length; i+=3) {
        // get the indices value for the triangle vertices
        let v1 = indices[i];  	  // 0   or // 0
        let v2 = indices[i + 1];  // 1 		// 2
        let v3 = indices[i + 2];  // 2 		// 3

        // getting the starting index of the vertex from vertices array as offset is 3, I multiply by 3
        let idx1 = v1 * 3;  // 0  or  // 0
        let idx2 = v2 * 3;  // 3 		// 6
        let idx3 = v3 * 3;  // 6 		// 9

        // getting the vertices as vec4, as idx variables has the starting index of the vertex, to get the next points idx+1, idx+2
        let a = vec4MV(vertices[idx1], vertices[idx1 + 1], vertices[idx1 + 2], 1.0);
        let b = vec4MV(vertices[idx2], vertices[idx2 + 1], vertices[idx2 + 2], 1.0);
        let c = vec4MV(vertices[idx3], vertices[idx3 + 1], vertices[idx3 + 2], 1.0);

        function calculateNormal(a, b, c) {
            // 3 main lines of NORMALS CALCULATION FOR 1 TRIANGLE WITH VERTICES a, b, c!
            let t1 = subtract(b, a);
            let t2 = subtract(c, a);
            let normal = normalize(cross(t2, t1));

            // converting vec3 to vec4, not needed if you send only vec3 to shaders, needed otherwise
            normal = vec4MV(normal);
            return normal;
        }

        function triangle(a, b, c) {
            let normal = calculateNormal(a, b, c);

            // the same normal for all 3 vertices of the triangle!!!!!
            // this is FLAT LIGHTING! Using triangles normals, not vertex normals
            normals.push(normal);
            normals.push(normal);
            normals.push(normal);
        }

        triangle(a, b, c);
    }
    for(let i = 0; i<normals.length; i++) {
        normalsArray.push(normals[i][0], normals[i][1], normals[i][2], normals[i][3]);
    }
    return normalsArray;
}