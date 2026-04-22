import type {CSSProperties, ReactNode} from "react";
import styled from "styled-components";

const StyledButton = styled.button<{size: number}>`
    margin: 8px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 16px;
    padding: 8px 24px 8px 24px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text1};
    font-size: ${props => props.size}em;
    
    background: linear-gradient(145deg, rgba(50, 50, 50, 0.25), rgba(25, 25, 25, 0.2));
    border: 4px #cbd5e1;

    box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.08),
            inset 0 1px 2px ${({ theme }) => theme.colors.text1};

    transition: all 0.25s ease;
    
    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.border1};
    }


    &:active:not(:disabled) {
        transform: scale(0.9);
    }
    
    user-select: none;
    
    &:disabled {
        background: linear-gradient(145deg, rgba(180, 180, 180, 0.25), rgba(125, 125, 125, 0.2));
        cursor: default !important;
        box-shadow: none;
    }
`;

type Props = {
    onClick: () => void;
    size: number;
    disabled?: boolean;
    style?: CSSProperties;
    children: ReactNode;
}

function Button({ onClick, size, disabled = false, style = {}, children }: Props) {
    return <StyledButton style={style} size={size} onClick={onClick} disabled={disabled}>{children}</StyledButton>;
}

export default Button;