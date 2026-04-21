import type {ChunkerSettingsData} from "../types/Types.ts";
import {getRandomName} from "../../random-name/utils/getRandomName.ts";

export const DefaultSettings: ChunkerSettingsData = {
    projectName: getRandomName(),
    startPosition: { x: 0, y: 0 },
    chunkSize: { width: 512, height: 512 }
}