import type {ChunkerSettingsData} from "../types/Types.ts";

export const DefaultSettings: ChunkerSettingsData = {
    projectName: "chunk",
    startPosition: { x: 0, y: 0 },
    chunkSize: { width: 512, height: 512 }
}