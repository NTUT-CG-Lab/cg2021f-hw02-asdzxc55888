let lines = []
const length = 1.25;
const lineGeometry = new THREE.PlaneGeometry(0.005, length);
const redLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const greenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const bludLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000088, side: THREE.DoubleSide });
const purpleLineMaterial = new THREE.MeshBasicMaterial({ color: 0x880088, side: THREE.DoubleSide });

let right = [], left = [];
let material;

function SetPosition(mesh, x, y) {
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = 5;
}

function CreateLine(x, y, parent, positionIndex, positionText = "right") {
    if (positionIndex == undefined) return;
    let position;
    if (positionText == "right") {
        position = right
        if (positionIndex == 0 || positionIndex == 2) {
            material = redLineMaterial;
        } else {
            material = greenLineMaterial;
        }
    } else if (positionText == "left") {
        position = left
        if (positionIndex == 0 || positionIndex == 2) {
            material = bludLineMaterial;
        } else {
            material = purpleLineMaterial;
        }
    }

    parent.remove(position[positionIndex])

    position[positionIndex] = new THREE.Mesh(lineGeometry, material);
    SetPosition(position[positionIndex], x, y);

    if (positionIndex == 0 || positionIndex == 2) {
        position[positionIndex].rotateZ(Math.PI / 2);
    }
    parent.add(position[positionIndex])
}

function CopyToLeft(parent) {
    left.forEach(element => {
        parent.remove(element);
    });

    for (let index = 0; index < 4; index++) {
        let x = -1 * right[index].position.x;
        let y = right[index].position.y;
        CreateLine(x, y, parent, index, "left")
    }

}