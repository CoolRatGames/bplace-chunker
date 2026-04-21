export type ChunkerSettingsData = {
    projectName: string;
    startPosition: Position;
    chunkSize: Size;
}

export type Position = {
    x: number;
    y: number;
}

export type Size = {
    width: number;
    height: number;
}