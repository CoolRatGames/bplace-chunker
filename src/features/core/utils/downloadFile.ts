export function downloadFile(content: string, file: string) {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    a.click();

    URL.revokeObjectURL(url);
}