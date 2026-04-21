import styled, {ThemeProvider} from "styled-components";
import {THEME_DARK, THEME_LIGHT} from "./features/themes/data/Themes.ts";
import ThemeToggle from "./features/themes/components/ThemeToggle.tsx";
import React, {useState} from "react";
import FileChooser from "./features/core/components/FileChooser.tsx";
import ChunkerSettings from "./features/chunker-settings/components/ChunkerSettings.tsx";
import type {ChunkerSettingsData} from "./features/chunker-settings/types/Types.ts";
import {DefaultSettings} from "./features/chunker-settings/data/Defaults.ts";
import Button from "./features/core/components/Button.tsx";
import type {TemplateFile} from "./features/bplace-file/types/bplace-file.ts";
import {createBPlaceFile} from "./features/bplace-file/utils/createTemplateFile.ts";
import TemplatePreview from "./features/core/components/TemplatePreview.tsx";
import {downloadTemplateFile} from "./features/bplace-file/utils/downloadTemplateFile.ts";

const RootContainer = styled.div`
    background: ${({theme}) => theme.colors.background1};
    color: ${({ theme }) => theme.colors.text1};
    
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputImagePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputImagePreview = styled.img`
    height: 6em;
    width: auto;
    flex-shrink: 0;
    display: block;
`;

const OutputContainer = styled.div<{count: number}>`
    width: fit-content;
    max-width: 80%;
    display: grid;
    grid-template-columns: repeat(${props => props.count}, 1fr);
    overflow: scroll;
    border-radius: 5px;
    border: 4px solid ${({ theme }) => theme.colors.border1};
    margin-bottom: 32px;
    place-items: center;
    padding: 4px;
`;

export default function App() {
    const preventDragDrop: (e: React.DragEvent<HTMLDivElement>) => void = (e) => { e.preventDefault(); };
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [inputImage, setInputImage] = useState<string | null>();
    const [settings, setSettings] = useState<ChunkerSettingsData>(DefaultSettings);

    const [outputWidth, setOutputWidth] = useState<number>(0);
    const [output, setOutput] = useState<TemplateFile[]>([]);

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = (prev === "light" ? "dark" : "light");
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    const onFileChoose = async (list: FileList) => {
        const file: File | null = list.item(0);
        console.log(file);
        if(!file) return;
        setInputImage(URL.createObjectURL(file));
    }

    const handleChunk = () => {
        const image = new Image();
        image.onload = () => {
            const tsWidth = settings.chunkSize.width;
            const tsHeight = settings.chunkSize.height;

            let canvas = document.createElement("canvas");
            canvas.width = tsWidth;
            canvas.height = tsHeight;
            let ctx = canvas.getContext('2d');
            if(!ctx) return;

            let slicesX = image.width / tsWidth;
            let slicesY = image.height / tsHeight;
            setOutputWidth(Math.ceil(slicesX));

            const output: TemplateFile[] = [];

            for (let y = 0; y < slicesY; y++) {
                for (let x = 0; x < slicesX; x++) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, x * tsWidth, y * tsHeight, tsWidth, tsHeight, 0, 0, tsWidth, tsHeight);

                    let data: TemplateFile = createBPlaceFile(settings.projectName, {x: x, y: y}, {width: tsWidth, height: tsHeight}, settings.startPosition, canvas.toDataURL());
                    output.push(data);
                }
            }
            setOutput(output);
        }
        image.src = inputImage!;
    }

    const handleDownloadAll = () => {
        output.forEach(downloadTemplateFile)
    }

    return (
        <ThemeProvider theme={theme == "light" ? THEME_LIGHT : THEME_DARK}>
            <RootContainer onDragOver={preventDragDrop} onDrop={preventDragDrop}>
                <ThemeToggle onClick={toggleTheme} />
                <h1>Better Place Chunker</h1>
                <FileChooser onFileSelected={onFileChoose}>
                <InputImagePreviewContainer>
                    {inputImage && <InputImagePreview src={inputImage}/>}
                </InputImagePreviewContainer>
                </FileChooser>
                <ChunkerSettings settings={settings} onChange={setSettings} />
                <Button size={2} onClick={handleChunk} disabled={inputImage == null}>Chunk!</Button>
                {output.length != 0 && (<>
                    <Button disabled={false} size={1} onClick={handleDownloadAll}>Download All</Button>
                    <OutputContainer count={outputWidth}>
                        {output.map((item) => (
                            <TemplatePreview key={item.template.name} file={item}></TemplatePreview>
                        ))}
                    </OutputContainer>
                </>)}
            </RootContainer>
        </ThemeProvider>
    )
}