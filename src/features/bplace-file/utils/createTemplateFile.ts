import type {TemplateFile} from "../types/bplace-file.ts";
import type {Position, Size} from "../../chunker-settings/types/Types.ts";

export function createBPlaceFile(
    name: string,
    position: Position,
    chunkSize: Size,
    startPosition: Position,
    imageData: string
): TemplateFile {
    return {
        version: 1,
        exportedAt: new Date().toUTCString(),
        template: {
            name: `${name}-${position.x}-${position.y}`,
            opacity: 1,
            position: {
                x: startPosition.x + (position.x * chunkSize.width),
                y: startPosition.y + (position.y * chunkSize.height),
            },
            scale: 1,
            rotation: 0,
            visible: true,
            width: chunkSize.width,
            height: chunkSize.height,
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