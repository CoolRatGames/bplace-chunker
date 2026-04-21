export interface TemplateFile {
    version: number;
    exportedAt: string;
    template: Template;
}

export interface Template {
    name: string;
    opacity: number;
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    visible: boolean;
    width: number;
    height: number;
    displayMode: string;
    renderAbovePixels: boolean;
    excludeSpecialColors: boolean;
    canvasType: string;
    imageInIndexedDB: boolean;
    imageData: string;
    _needsImageLoad: boolean;
    _version: number;
}