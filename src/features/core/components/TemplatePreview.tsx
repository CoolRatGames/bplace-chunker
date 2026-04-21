import React from "react";
import type {TemplateFile} from "../../bplace-file/types/bplace-file.ts";
import styled from "styled-components";
import {downloadTemplateFile} from "../../bplace-file/utils/downloadTemplateFile.ts";

const OutputTemplatePreview = styled.div`
    transition: all 0.5s ease;
    &:hover {
        cursor: pointer;
        transform: rotate3d(1, 1, 0, 20deg);
    }
    border: 2px solid black;
    width: fit-content;
    height: fit-content;
    margin: 4px;
`;

const OutputTemplatePreviewImage = styled.img<{size: number}>`
    image-rendering: pixelated;
    display: block;
    width: ${props => props.size}em;
    height: auto;
`;

type Props = {
    size: number;
    file: TemplateFile;
}

function TemplatePreview({ file, size }: Props) {
    const handleClick = () => {
        downloadTemplateFile(file);
    };

    return (
        <OutputTemplatePreview onClick={handleClick}>
            <OutputTemplatePreviewImage size={size} src={file.template.imageData}/>
        </OutputTemplatePreview>
    );
}

export default TemplatePreview;