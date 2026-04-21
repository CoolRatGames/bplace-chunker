import type {TemplateFile} from "../types/bplace-file.ts";
import {downloadFile} from "../../core/utils/downloadFile.ts";

export function downloadTemplateFile(file: TemplateFile) {
    let json = JSON.stringify(file);
    let name = `${file.template.name}.bplace`;
    downloadFile(json, name);
}