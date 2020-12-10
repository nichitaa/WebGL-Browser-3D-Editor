export let sceneParameters = {
    gl: null,
    program: null,
    lightPosition: vec4MV(2.0, 1.0, 0.0, 1.0),
    lightPositionLoc: null,
    lightPosition1: vec4MV(-2.0, 1.0, 0.0, 1.0),
    lightPositionLoc1: null,
    ui: {
        pressedKeys: {},
    },
    animation: {},
    app: {
        eye: {
            x:2.0,
            y:3.0,
            z:7.0,
        },
        at: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
        },
        up: {
            x: 0.0,
            y: 1.0,
            z: 0.0,
        },
        phi: 0.0,
        radius: 4.0,
        dr: 5.0 * Math.PI / 180,
        near: 1.0,
        far: 100.0,
        fovy: 45,
        aspect: 1.4,
        // array of objects (to display multiple objects)
        objects: {},
    },
};