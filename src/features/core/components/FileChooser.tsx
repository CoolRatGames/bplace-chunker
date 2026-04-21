import styled, {css} from "styled-components";
import React, {useRef, useState} from "react";
import FolderIcon from "../../icons/components/FolderIcon.tsx";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.text1};
    margin: 8px;
    user-select: none;
`;

const DropArea = styled.div<{ $isDragging: boolean }>`
    padding: 16px 32px 16px 32px;
    border-radius: 16px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    cursor: pointer;
    position: relative;
    
    background: linear-gradient(145deg, rgba(50, 50, 50, 0.25), rgba(25, 25, 25, 0.2));
    border: 4px #cbd5e1;
    
    box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 2px ${({ theme }) => theme.colors.text1};
    
    transition: all 0.25s ease;
    
    ${(props) =>
        props.$isDragging &&
        css`
            border-color: ${({ theme }) => theme.colors.border1};
            background: linear-gradient(145deg, rgba(100, 100, 100, 0.5), rgba(90, 90, 90, 0.5));
            transform: scale(1.02);
        `}
        
    &:hover {
        border-color: ${({ theme }) => theme.colors.border1};
        transform: translateY(-2px);
    }
    
    &:active {
        transform: scale(0.98);
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    pointer-events: none;
`;

const Icon = styled.div`
    font-size: 32px;
    color: ${({ theme }) => theme.colors.text1};
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const Subtitle = styled.div`
    font-size: 13px;
`;

type Props = {
    onFileSelected: (files: FileList) => void;
    children: React.ReactNode;
};

export default function FileChooser({ onFileSelected, children }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList) => { onFileSelected(files); };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer!.files && e.dataTransfer!.files.length > 0) handleFiles(e.dataTransfer!.files);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => { setIsDragging(false); };
    const onClick = () => { inputRef.current?.click(); };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    return (
        <Container>
            <DropArea
                $isDragging={isDragging}
                onClick={onClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
            >
                <HiddenInput
                    ref={inputRef}
                    type="file"
                    accept={"image/*"}
                    multiple={false}
                    onChange={onChange}
                />

                <Content>
                    <Icon><FolderIcon/></Icon>
                    {children}
                    <Title>Drag & drop Image here</Title>
                    <Subtitle>or click to browse</Subtitle>
                </Content>
            </DropArea>
        </Container>
    );
};