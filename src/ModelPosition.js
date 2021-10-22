import { MMDLoader } from '../jsm/loaders/MMDLoader.js';
const length = 1.25;
const lineGeometry = new THREE.PlaneGeometry(0.005, length);
const redLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const greenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const bludLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000088, side: THREE.DoubleSide });
const purpleLineMaterial = new THREE.MeshBasicMaterial({ color: 0x880088, side: THREE.DoubleSide });
export class ModelPosition {
    constructor(modelPath) {
        this.modelPath = modelPath;
        this.loader = new MMDLoader();
        this.mesh = new THREE.Object3D();;
        this.loadModel();
        this.leftLine = [];
        this.rightLine = [];
    }

    loadModel() {
        this.loader.load(this.modelPath, (object) => this.setMesh(object));
    }

    setMesh(object) {
        this.mesh = object;
        this.mesh.position.y = - 10;
    }

    getMesh() {
        return this.mesh;
    }

    SetPosition(mesh, x, y) {
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = 5;
    }

    CreateLine(x, y, parent, positionIndex, positionText = "right") {
        if (positionIndex == undefined) return;
        let position, material;
        if (positionText == "right") {
            position = this.rightLine
            if (positionIndex == 0 || positionIndex == 2) {
                material = redLineMaterial;
            } else {
                material = greenLineMaterial;
            }
        } else if (positionText == "left") {
            position = this.leftLine
            if (positionIndex == 0 || positionIndex == 2) {
                material = bludLineMaterial;
            } else {
                material = purpleLineMaterial;
            }
        }

        parent.remove(position[positionIndex])

        position[positionIndex] = new THREE.Mesh(lineGeometry, material);
        this.SetPosition(position[positionIndex], x, y);
        console.log(position[positionIndex])

        if (positionIndex == 0 || positionIndex == 2) {
            position[positionIndex].rotateZ(Math.PI / 2);
        }
        parent.add(position[positionIndex])
    }

    CopyToLeft(parent) {
        this.leftLine.forEach(element => {
            parent.remove(element);
        });

        for (let index = 0; index < 4; index++) {
            let x = -1 * this.rightLine[index].position.x;
            let y = this.rightLine[index].position.y;
            this.CreateLine(x, y, parent, index, "left")
        }

    }

    ShowLines(parent) {
        for (let index = 0; index < 4; index++) {
            if (this.rightLine[index] != undefined) parent.add(this.rightLine[index]);
            if (this.leftLine[index] != undefined) parent.add(this.leftLine[index]);
        }
    }

    HidenLines(parent) {
        for (let index = 0; index < 4; index++) {
            if (this.rightLine[index] != undefined) parent.remove(this.rightLine[index]);
            if (this.leftLine[index] != undefined) parent.remove(this.leftLine[index]);
        }
    }

    GetPoints() {
        if(this.rightLine.length != 4) return null;

        return {
            "modelPath": this.modelPath,
            "line_location_1": [this.rightLine[0].position.y, this.rightLine[1].position.x],
            "line_location_2": [this.rightLine[2].position.y, this.rightLine[1].position.x],
            "line_location_3": [this.rightLine[2].position.y, this.rightLine[3].position.x],
            "line_location_4": [this.rightLine[0].position.y, this.rightLine[3].position.x]
        }
    }
}