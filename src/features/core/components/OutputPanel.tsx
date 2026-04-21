import React, {memo, useState} from "react";
import styled from "styled-components";
import type {TemplateFile} from "../../bplace-file/types/bplace-file.ts";
import Button from "./Button.tsx";
import TemplatePreview from "./TemplatePreview.tsx";
import {downloadTemplateFile} from "../../bplace-file/utils/downloadTemplateFile.ts";

const OutputContainer = styled.div<{ $count: number}>`
    width: fit-content;
    max-width: 80%;
    display: grid;
    grid-template-columns: repeat(${props => props.$count}, 1fr);
    overflow: scroll;
    border-radius: 5px;
    border: 4px solid ${({ theme }) => theme.colors.border1};
    margin-bottom: 32px;
    place-items: center;
    padding: 4px;
`;

type Props = {
    output: TemplateFile[];
    outputWidth: number;
}

function OutputPanel({ output, outputWidth }: Props) {
    const [previewSize, setPreviewSize] = useState<number>(5);

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreviewSize(e.target.valueAsNumber)
    }

    const handleDownloadAll = () => {
        output.forEach(downloadTemplateFile)
    }

    return (
        <>
            {output.length != 0 && (<>
                <Button disabled={false} size={1} onClick={handleDownloadAll}>Download All</Button>
                <label>Preview Size</label>
                <input onChange={handleSizeChange} type="range" value={previewSize} min="1" max="20" />
                <OutputContainer $count={outputWidth}>
                    {output.map((item) => (
                        <TemplatePreview size={previewSize} key={item.template.name} file={item}></TemplatePreview>
                    ))}
                </OutputContainer>
            </>)}
        </>
    );
}

export default memo(OutputPanel);