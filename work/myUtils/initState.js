import {sceneParameters} from "../state.js";
import {SolidCube} from "../Shapes/SolidCube.js";
import {ChangeGradient} from "./ChangeGradient.js";
import {Pyramid} from "../Shapes/Pyramid.js";
import {Cone} from "../Shapes/Cone.js";
import {Romb} from "../Shapes/Romb.js";
import {Cube} from "../Shapes/Cube.js";
import {Sphere} from "../Shapes/Sphere.js";
import {Obj} from "../Shapes/Object.js";

// var to track which object is active, to change only it's movements
export let ActiveObject;

// spinning toggle variable
let toggleSpin = false;

/*==================================================================================================================*/
// vars to construct a name for each object variable corresponding to it's shape (explication at line: 527)
let cubes_ = 0;
let solids_ = 0;
let rombs_ = 0;
let piramids_ = 0;
let cones_ = 0;
let sphere_ = 0;
let obj_ = 0;

let cubeN = 'GradientCube';
let solidN = 'SolidCube';
let rombN = 'romb';
let piramidN = 'piramid';
let coneN = 'cone';
let sphereN = 'sphere';
let objN = 'obj';

export function initState() {
    // our select from html
    let select = document.getElementById("dynamic-select");

    // uMVP matrix form vShader
    sceneParameters.uMVPMatrix = sceneParameters.gl.getUniformLocation(sceneParameters.program, 'uMVPMatrix');
    // for lights
    sceneParameters.lightPositionLoc = sceneParameters.gl.getUniformLocation(sceneParameters.program, "lightPosition");
    sceneParameters.lightPositionLoc1 = sceneParameters.gl.getUniformLocation(sceneParameters.program, "lightPosition1");

    sceneParameters.vm = mat4.create(); // view
    sceneParameters.pm = mat4.create(); // proj
    sceneParameters.mvp = mat4.create(); // final

    // add a default object to canvas (Solid colored cube)
    // create variable name for this object
    solids_ += 1;
    let name = solidN + 1; // "solidCube1"
    sceneParameters.app.objects[name] = new SolidCube(); // add to scene and initialize
    ActiveObject = sceneParameters.app.objects[name]; // make it active
    select.options[select.options.length] = new Option(name, solids_, false, false); // add it's name to the dropdown menu

    // BUTTON AND SLIDERS!
    // select an object from the dropdown and make it active in order to change only it's parameters and attributes
    document.getElementById("SelectObject").onclick = function () {
        let option = select.options[select.selectedIndex]; // get the option in select
        let name = option.text;                            // get the text from this option
        ActiveObject = sceneParameters.app.objects[name];  // the text from the option is the key (form objects dict) for the object itself
    }
    document.getElementById("DeleteSelectedObject").onclick = function () {
        let option = select.options[select.selectedIndex];
        let name = option.text;
        delete sceneParameters.app.objects[name];
        select.options[select.selectedIndex] = null; // set the option to null, not to be displayed in the select
    }
    // delete all objects from canvas
    document.getElementById("clearCanvas").onclick = function () {
        if (sceneParameters.app.objects.length === 0) { alert("The Canvas has no more objects!") }
        else {
            // clear dict with object, and reset all variables which are for naming objects
            sceneParameters.app.objects = {};
            cubes_ = rombs_ = solids_ = cones_ = piramids_ = 0;
            cubeN = 'GradientCube'; solidN = 'SolidCube'; rombN = 'romb'; piramidN = 'piramid'; coneN = 'cone';
            // selects to null
            select.options.length = 0;
        }
    };
    // generates new colors for the ActiveObject
    document.getElementById("newGradient").onclick = function () {
        ChangeGradient();
    };

    // utilities to add objects
    document.getElementById("file-input").onchange = function () {
        var selectedFiles = this.files;
        if (selectedFiles.length === 0) {
            alert('Error : No file selected');
            return;
        }
        var firstFile = selectedFiles[0]; // picking the first file from the selected ones
        readTextFromFile(firstFile);
    };
    document.getElementById("addPyramid").onclick = function () {
        // maximum 3 objects on canvas
        if (Object.keys(sceneParameters.app.objects).length < 3) {
            piramids_ += 1; // increment variable for naming
            let name = piramidN + piramids_; // set the name of the object -> name = "piramid1"
            sceneParameters.app.objects[name] = new Pyramid(); // add the var name as a key to the object scene dict and it's value the actual object -> "piramid1": new Pyramid;
            TransposeObjectOnCanvas(sceneParameters.app.objects[name]); // set it on canvas
            select.options[select.options.length] = new Option(name, piramids_, false, true); // add a option with the object var name to html select
            ActiveObject = sceneParameters.app.objects[name]; // make the last added object to be active;
        } else { alert("Only 3 object can be drawn on the canvas!") }
    };
    document.getElementById("sphere").onclick = function () {
        if (Object.keys(sceneParameters.app.objects).length < 3) {
            sphere_ += 1;
            let name = sphereN + sphere_;
            sceneParameters.app.objects[name] = new Sphere();
            TransposeObjectOnCanvas(sceneParameters.app.objects[name]);
            select.options[select.options.length] = new Option(name, sphere_, false, true);
            ActiveObject = sceneParameters.app.objects[name];
        } else { alert("Only 3 object can be drawn on the canvas!") }
    };
    document.getElementById("addCone").onclick = function () {
        if (Object.keys(sceneParameters.app.objects).length < 3) {
            cones_ += 1;
            let name = coneN + cones_;
            sceneParameters.app.objects[name] = new Cone();
            TransposeObjectOnCanvas(sceneParameters.app.objects[name]);
            select.options[select.options.length] = new Option(name, cones_, false, true);
            ActiveObject = sceneParameters.app.objects[name];
        } else { alert("Only 3 object can be drawn on the canvas!") }
    };
    document.getElementById("addRomb").onclick = function () {
        if (Object.keys(sceneParameters.app.objects).length < 3) {
            rombs_ += 1;
            let name = rombN + rombs_;
            sceneParameters.app.objects[name] = new Romb();
            TransposeObjectOnCanvas(sceneParameters.app.objects[name]);
            select.options[select.options.length] = new Option(name, rombs_, false, true);
            ActiveObject = sceneParameters.app.objects[name];
        } else { alert("Only 3 object can be drawn on the canvas!") }
    };
    document.getElementById("addCube").onclick = function () {
        if (Object.keys(sceneParameters.app.objects).length < 3) {
            cubes_ += 1;
            let name = cubeN + cubes_;
            sceneParameters.app.objects[name] = new Cube();
            TransposeObjectOnCanvas(sceneParameters.app.objects[name]);
            select.options[select.options.length] = new Option(name, cubes_, false, true);
            ActiveObject = sceneParameters.app.objects[name];
        }else { alert("Only 3 object can be drawn on the canvas!"); }
    };
    document.getElementById("solidColorCube").onclick = function () {
        // max 3 objects
        if (Object.keys(sceneParameters.app.objects).length < 3) {
            solids_ += 1;
            let name = solidN + solids_;
            sceneParameters.app.objects[name] = new SolidCube();
            TransposeObjectOnCanvas(sceneParameters.app.objects[name]);
            select.options[select.options.length] = new Option(name, solids_, false, true);
            ActiveObject = sceneParameters.app.objects[name];
        }else { alert("Only 3 object can be drawn on the canvas!"); }

    };
    // change canvas colors
    document.getElementById("lightblue").onclick = function () {
        sceneParameters.gl.clearColor(0.8, 0.89, 1.0, 1.0);
    };
    document.getElementById("lightgreen").onclick = function () {
        sceneParameters.gl.clearColor(0.8, 1.0, 0.89, 1.0);
    };
    document.getElementById("lightgrey").onclick = function () {
        sceneParameters.gl.clearColor(0.79, 0.82, 0.83, 1.0);
    };
    // change spin direction/toggle spin for ActiveObject
    document.getElementById("spinPos").onclick = function () {
        ActiveObject.setDirection(true);
    };
    document.getElementById("spinNeg").onclick = function () {
        ActiveObject.setDirection(false);
    };
    document.getElementById("toggleSpin").onclick = function () {
        toggleSpin = !toggleSpin;
        ActiveObject.setToggleSpin(toggleSpin);
    };
    // change rotation axis for ActiveObject
    document.getElementById( "xButton" ).onclick = function () {
        ActiveObject.setAxis("x");
    };
    document.getElementById( "yButton" ).onclick = function () {
        ActiveObject.setAxis("y");
    };
    document.getElementById( "zButton" ).onclick = function () {
        ActiveObject.setAxis("z");
    };
    // change translation on x/y for ActiveObject
    document.getElementById("TranslateX").onchange = function(event) {
        ActiveObject.setTranslationValueX(event.target.value);
    };
    document.getElementById("TranslateY").onchange = function(event) {
        ActiveObject.setTranslationValueY(event.target.value);
    };
    // change eye position for the camera
    document.getElementById("CloserFurther").onchange = function(event) {
        sceneParameters.app.eye.y = event.target.value;
    };
    // change scale on x/y for ActiveObject
    document.getElementById("ScaleX").onchange = function(event) {
        ActiveObject.setScaleValueX(event.target.value);
    };
    document.getElementById("ScaleY").onchange = function(event) {
        ActiveObject.setScaleValueY(event.target.value);
    };
    document.getElementById("ScaleZ").onchange = function(event) {
        ActiveObject.setScaleValueZ(event.target.value);
    };
    // up sliders for camera
    document.getElementById("upX").onchange = function(event) {
        sceneParameters.app.up.x = event.target.value;
    };
    document.getElementById("upY").onchange = function(event) {
        sceneParameters.app.up.y = event.target.value;
    };
    document.getElementById("upZ").onchange = function(event) {
        sceneParameters.app.up.z = event.target.value;
    };
    // field of view slider
    document.getElementById("fovySlider").onchange = function(event) {
        sceneParameters.app.fovy = event.target.value;
    };
    // aspect slider
    document.getElementById("aspectSlider").onchange = function(event) {
        sceneParameters.app.aspect = event.target.value;
    };
    // toggle theme
    document.getElementById("toggleTheme").onclick = function(event) {
        document.body.classList.toggle('dark-mode');
    };
    // function to set the object on the canvas, on a random translated position on x axis
    // random translation values -> from 2 to 4 units on x axis
    function TransposeObjectOnCanvas(){
        let len = Object.keys(sceneParameters.app.objects).length;
        if (len === 2) {
            // translate to positive x (add object to the left)
            mat4.translate(Object.values(sceneParameters.app.objects)[1].state.mm, Object.values(sceneParameters.app.objects)[1].state.mm, vec3.fromValues(Math.random() * (4 - 2) + 2,0,0));
        } else if (len === 3) {
            // translate to negative x (add object to the right)
            mat4.translate(Object.values(sceneParameters.app.objects)[2].state.mm, Object.values(sceneParameters.app.objects)[2].state.mm, vec3.fromValues(-(Math.random() * (4 - 2) + 2),0,0));
        }
    }
    // parse from obj
    function readTextFromFile(file) {
        var reader = new FileReader(); // creating the object that will help us read the file
        // setting a listener that will catch the 'load' event of reader functions
        reader.addEventListener('load', function (e) {
            // when the contents are loaded --- execute all of these actions
            var text = e.target.result;
            console.log(text)
            console.log(text.length)

            let lines = text.split("\r\n")
            let data = lines.filter(e => e[0] === 'v' || e[0] === 'f')
            console.log("data: ", data)

            // v
            let vdata = data.filter(e => e.startsWith('v '))
            let vlines = []
            vdata.forEach((el) => {
                vlines.push((el.substring(3) + " 1.0").split(' '))
            })
            let v = []
            vlines.forEach((el) => {
                let line = []
                el.forEach((el1) => {
                    line.push(parseFloat(el1))
                })
                v.push(line)
            })
            console.log("v", v)
            // vn
            let vndata = data.filter(e => e.startsWith('vn '))
            let vnlines = []
            vndata.forEach((el) => {
                vnlines.push((el.substring(3) + " 1.0").split(' '))
            })
            let vn = []
            vnlines.forEach((el) => {
                let line = []
                el.forEach((el1) => {
                    line.push(parseFloat(el1))
                })
                vn.push(line)
            })
            console.log("vn", vn)
            // vt
            let vtdata = data.filter(e => e.startsWith('vt '))
            let vtlines = []
            vtdata.forEach((el) => {
                vtlines.push((el.substring(3) + " 1.0").split(' '))
            })
            let vt = []
            vtlines.forEach((el) => {
                let line = []
                el.forEach((el1) => {
                    line.push(parseFloat(el1))
                })
                vt.push(line)
            })
            console.log("vt", vt)

            // indices
            let fdata = data.filter(e => e.startsWith('f '))
            let flines = []
            fdata.forEach((el) => {
                flines.push((el.substring(2)).split(' ').filter(item => item))
            })
            let indices = []
            flines.forEach((el) => {
                let index = []
                el.forEach((el1) => {
                    index.push(el1.split('/'))
                })
                let arr = []
                index.forEach((idx) => {
                    idx.forEach((i) => {
                        arr.push(parseInt(i)-1)
                    })
                })
                indices.push(arr[0]); // only first value -> only vertex index
                indices.push(arr[3]);
                indices.push(arr[6]);
            })
            // set it up on canvas
            if (Object.keys(sceneParameters.app.objects).length < 3) {
                obj_ += 1;
                let name = objN + obj_;
                sceneParameters.app.objects[name] = new Obj(v, vn, indices);
                TransposeObjectOnCanvas(sceneParameters.app.objects[name]);
                select.options[select.options.length] = new Option(name, obj_, false, true);
                ActiveObject = sceneParameters.app.objects[name];
            } else { alert("Only 3 object can be drawn on the canvas!") }
        });
        // listener for errors that may occur
        reader.addEventListener('error', function () {
            alert('File error happened!');
        });
        // the readAsText function will get the plain text from the file
        reader.readAsText(file); // when the function will complete execution, the 'load' event will fire
    }
}