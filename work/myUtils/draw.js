import {sceneParameters} from "../state.js";

export function draw() {
    // clear color & depth buffer bit
    sceneParameters.gl.clear(sceneParameters.gl.COLOR_BUFFER_BIT | sceneParameters.gl.DEPTH_BUFFER_BIT);

    // mvp matrix
    let uMVPMatrix = sceneParameters.uMVPMatrix;
    // new view, projection matrices
    let vm = sceneParameters.vm;
    let pm = sceneParameters.pm;
    let mvp = sceneParameters.mvp;
    // perspective matrix
    mat4.perspective(pm, sceneParameters.app.fovy, sceneParameters.app.aspect, sceneParameters.app.near, sceneParameters.app.far );
    // model view mat
    mat4.lookAt(vm,
        vec3.fromValues(sceneParameters.app.eye.x,sceneParameters.app.eye.y,sceneParameters.app.eye.z), // eye
        vec3.fromValues(sceneParameters.app.at.x,sceneParameters.app.at.y,sceneParameters.app.at.z), // at
        vec3.fromValues(sceneParameters.app.up.x,sceneParameters.app.up.y,sceneParameters.app.up.z)  // up
    );

    // Loop through each object and draw it
    for (const [key, val] of Object.entries(sceneParameters.app.objects)) {
        let obj = val; // object = value from the scene dict with objects
        // console.log("object here::: ", obj)
        sceneParameters.program.renderBuffers(obj); // render buffer for the object
        // calculate matrices
        mat4.copy(mvp, pm);
        mat4.multiply(mvp, mvp, vm);
        mat4.multiply(mvp, mvp, obj.state.mm); // result in mvp
        // rotation for each object
        if (obj.toggleSpin === false) {
            if (obj.direction === true) {
                obj.theta[obj.axis] += 2;
            } else {
                obj.theta[obj.axis] -= 2;
            }
        } else {
            obj.theta[obj.axis] += 0;
        }

        // light
        // let speed = 0.0;
        // sceneParameters.lightPosition[0] = 2* Math.sin( (new Date).getTime() * speed );
        // sceneParameters.lightPosition[1] = Math.cos( (new Date).getTime() * speed );
        //
        // sceneParameters.lightPosition1[0] = 2* Math.sin( (new Date).getTime() * speed );
        // sceneParameters.lightPosition1[1] = Math.cos( (new Date).getTime() * speed );

        // send the updated light position to the shader (every frame!!!)
        sceneParameters.gl.uniform4fv( sceneParameters.lightPositionLoc, flatten(sceneParameters.lightPosition) );
        sceneParameters.gl.uniform4fv( sceneParameters.lightPositionLoc1, flatten(sceneParameters.lightPosition1) );

        sceneParameters.gl.uniform3fv(obj.thetaLoc, obj.theta);
        // translate each obj by its parameters
        sceneParameters.gl.uniformMatrix4fv(obj.uTranslationMatrix, false, obj.translationMatrix);
        obj.uTranslationMatrix = sceneParameters.gl.getUniformLocation(sceneParameters.program, 'uTranslationMatrix');
        // scale each obj
        sceneParameters.gl.uniformMatrix4fv(obj.uScaleMatrix, false, obj.scaleMatrix);
        obj.uScaleMatrix = sceneParameters.gl.getUniformLocation(sceneParameters.program, 'uScaleMatrix');

        sceneParameters.gl.uniformMatrix4fv(uMVPMatrix, false, mvp); // send the final matrix to shaders
        sceneParameters.gl.drawElements(sceneParameters.gl.TRIANGLES, obj.indices.length, sceneParameters.gl.UNSIGNED_BYTE, 0); // draw
    }
}