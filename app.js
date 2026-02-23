const startButton = document.getElementById("startButton");
const downloadAllButton = document.getElementById("dlAll");
const output = document.getElementById("output");

const inputImage = document.getElementById("imageInput");
const inputProjectName = document.getElementById("projectName");
const inputStartX = document.getElementById("startPosX");
const inputStartY = document.getElementById("startPosY");
const inputChunkWidth = document.getElementById("chunkWidth");
const inputChunkHeight = document.getElementById("chunkHeight");

// This stores functions which execute a download for its given tile
let allTiles = [];

// Downloads text into a file, assumes JSON
function download(content, file) {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    a.click();

    URL.revokeObjectURL(url);
}

function createBPlaceFile(name, x, y, tsWidth, tsHeight, startX, startY, imageData) {
    return {
        version: 1,
        exportedAt: new Date().toUTCString(),
        template: {
            name: `${name}-${x}-${y}`,
            opacity: 1,
            position: {
                x: startX + (x * tsWidth),
                y: startY + (y * tsHeight)
            },
            scale: 1,
            rotation: 0,
            visible: true,
            width: tsWidth,
            height: tsHeight,
            displayMode: "image",
            renderAbovePixels: true,
            excludeSpecialColors: false,
            canvasType: "world",
            imageInIndexedDB: true,
            imageData: imageData,
            _needsImageLoad: true,
            _version: 5
        }
    };
}

function begin({ image, projectName, startX, startY, tsWidth, tsHeight }) {
    let canvas = document.createElement("canvas");
    canvas.width = tsWidth;
    canvas.height = tsHeight;
    let ctx = canvas.getContext('2d');

    let slicesX = image.width / tsWidth;
    let slicesY = image.height / tsHeight;

    for (let y = 0; y < slicesY; y++) {
        const currentRow = document.createElement("div");
        output.appendChild(currentRow);
        for (let x = 0; x < slicesX; x++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, x * tsWidth, y * tsHeight, tsWidth, tsHeight, 0, 0, tsWidth, tsHeight);

            let data = createBPlaceFile(projectName, x, y, tsWidth, tsHeight, startX, startY, canvas.toDataURL());
            let json = JSON.stringify(data);
            let file = `${projectName}-${x}-${y}.bplace`;
            allTiles.push(() => { download(json, file); });

            let newImage = document.createElement("img");
            newImage.src = canvas.toDataURL();
            newImage.classList.add("previewChunk");
            newImage.onclick = () => { download(json, file); };
            currentRow.appendChild(newImage);
        }
    }
}

function start() {
    output.innerHTML = "";
    allTiles = [];

    const img = new Image();
    img.src = URL.createObjectURL(inputImage.files[0]);
    img.onload = () => { begin({
        image: img,
        projectName: inputProjectName.value === "" ? "chunk" : inputProjectName.value,
        startX: parseInt(inputStartX.value ?? "0"),
        startY: parseInt(inputStartY.value ?? "0"),
        tsWidth: parseInt(inputChunkWidth.value ?? "0"),
        tsHeight: parseInt(inputChunkHeight.value ?? "0")
    }); };
}

startButton.onclick = () => { start() };
downloadAllButton.onclick = () => {
    allTiles.forEach(tile => { tile(); });
};