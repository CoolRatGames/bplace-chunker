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
import {getRandomName} from "./features/random-name/utils/getRandomName.ts";
import OutputPanel from "./features/core/components/OutputPanel.tsx";

const RootContainer = styled.div`
    background: ${({theme}) => theme.colors.background1};
    color: ${({ theme }) => theme.colors.text1};
    
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Footer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    margin-bottom: 16px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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

    const openWebsite = () => { window.open("https://wollinger.io", "_blank"); };
    const openGithub = () => { window.open("https://github.com/CoolRatGames/bplace-chunker", "_blank"); };

    const onFileChoose = async (list: FileList) => {
        const file: File | null = list.item(0);
        if(!file) return;
        setInputImage(URL.createObjectURL(file));
        setSettings({ ...settings, projectName: getRandomName() });
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

    return (
        <ThemeProvider theme={theme == "light" ? THEME_LIGHT : THEME_DARK}>
            <RootContainer onDragOver={preventDragDrop} onDrop={preventDragDrop}>
                <ThemeToggle onClick={toggleTheme} />
                <h1>Better Place Chunker</h1>
                <FileChooser selectedImage={inputImage} onFileSelected={onFileChoose}/>
                <ChunkerSettings settings={settings} onChange={setSettings} />
                <Button size={2} onClick={handleChunk} disabled={inputImage == null}>Chunk!</Button>
                <OutputPanel output={output} outputWidth={outputWidth} />

                <Footer>
                    <Row>Made with 🐀 by Sven Wollinger</Row>
                    <Row>
                        <Button size={1} onClick={openWebsite}><span style={{display:"flex", alignItems: "center"}}>Wollinger.io</span></Button>
                        <Button size={1} onClick={openGithub}><span style={{display:"flex", alignItems: "center"}}>View on Github</span></Button>
                    </Row>
                </Footer>
            </RootContainer>
        </ThemeProvider>
    )
}