import styled, {css} from "styled-components";
import React, {useState} from "react";
import type {ChunkerSettingsData} from "../types/Types.ts";
import {DefaultSettings} from "../data/Defaults.ts";
import {BPLACE_CANVAS_SIZE, BPLACE_TEMPLATE_MAX} from "../../core/data/Constants.ts";


const ToggleSettingsButton = styled.button`
    width: calc(100% + 64px);
    height: calc(100% + 16px);
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text1};
    cursor: pointer;
    text-align: center;
`;


const StyledSurface = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 16px;
    padding: 8px 32px 8px 32px;
    align-items: center;
    justify-content: center;


    background: linear-gradient(145deg, rgba(50, 50, 50, 0.25), rgba(25, 25, 25, 0.2));
    border: 4px #cbd5e1;

    box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.08),
            inset 0 1px 2px ${({ theme }) => theme.colors.text1};

    transition: all 0.25s ease;

    &:has(${ToggleSettingsButton}:active) {
        transform: scale(0.98);

    }
    &:hover {
        border-color: ${({ theme }) => theme.colors.border1};
    }


    &:active {
    }
    
    user-select: none;
`;

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SettingsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 4px;
`;

const PaddingDiv = styled.div`
    padding: 4px;
`;

const Label = styled.label`
    padding: 4px;
`;

type Props = {
    settings: ChunkerSettingsData;
    onChange: (settings: ChunkerSettingsData) => void;
}

function ChunkerSettings({ settings, onChange }: Props) {
    const [visible, setVisible] = useState<boolean>(true);

    const toggleVisibility = () => { setVisible(!visible); }

    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        onChange({ ...settings, projectName: e.target.value });
    }

    const handlePositionChange = (axis: "x" | "y", value: number) => {
        const newSettings = { ...settings };
        newSettings.startPosition[axis] = value;
        onChange(newSettings);
    }

    const handleSizeChange = (axis: "width" | "height", value: number) => {
        const newSettings = { ...settings };
        newSettings.chunkSize[axis] = value;
        onChange(newSettings);
    }

    return (

            <StyledSurface>
                <ToggleSettingsButton onClick={toggleVisibility}>Settings</ToggleSettingsButton>
                {visible && (
                    <SettingsContainer>
                        <hr style={{width:"100%"}}/>
                        <SettingsRow style={{textAlign:"center"}}>Project Name</SettingsRow>
                        <SettingsRow><input type="text" value={settings.projectName} onChange={handleProjectNameChange}/></SettingsRow>
                        <hr style={{width:"100%", opacity: "0.4"}}/>
                        <SettingsRow style={{textAlign:"center"}}>Start Position</SettingsRow>
                        <SettingsRow>
                            <PaddingDiv>
                                <Label>X</Label>
                                <input type="number" min={0} max={BPLACE_CANVAS_SIZE} value={settings.startPosition.x} onChange={(e) => handlePositionChange("x", e.target.valueAsNumber)}/>
                            </PaddingDiv>
                            <PaddingDiv>
                                <Label>Y</Label>
                                <input type="number" min={0} max={BPLACE_CANVAS_SIZE} value={settings.startPosition.y} onChange={(e) => handlePositionChange("y", e.target.valueAsNumber)}/>
                            </PaddingDiv>
                        </SettingsRow>
                        <hr style={{width:"100%", opacity: "0.4"}}/>
                        <SettingsRow style={{textAlign:"center"}}>Chunk Size</SettingsRow>
                        <SettingsRow>
                            <PaddingDiv>
                                <Label>X</Label>
                                <input type="number" min={0} max={BPLACE_TEMPLATE_MAX} value={settings.chunkSize.width} onChange={(e) => handleSizeChange("width", e.target.valueAsNumber)}/>
                            </PaddingDiv>
                            <PaddingDiv>
                                <Label>Y</Label>
                                <input type="number" min={0} max={BPLACE_TEMPLATE_MAX} value={settings.chunkSize.height} onChange={(e) => handleSizeChange("height", e.target.valueAsNumber)}/>
                            </PaddingDiv>
                        </SettingsRow>
                    </SettingsContainer>
                )}
            </StyledSurface>


    );
}

export default ChunkerSettings;