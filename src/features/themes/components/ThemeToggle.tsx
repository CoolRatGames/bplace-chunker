import styled, {useTheme} from "styled-components";
import LightModeIcon from "../../icons/components/LightModeIcon.tsx";
import DarkModeIcon from "../../icons/components/DarkModeIcon.tsx";

const ButtonContainer = styled.button`
    right: 0;
    margin: 16px;
    color: ${({ theme }) => theme.colors.text1};
    padding: 16px;
    background-color: rgba(50, 50, 50, 0.25);

    border-radius: 999px;
    border: 4px solid ${({ theme }) => theme.colors.border1};
    cursor: pointer;

    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.2);

    transition: background 0.3s ease, box-shadow 0.2s ease;

    &:hover {
        box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.4);
        transform: translateY(-1px) scale(0.97);
    }

    &:active {
        transition: transform 0.1s, box-shadow 0.1s !important;
        transform: scale(0.97) translateY(1px) !important;
    }
`;

type Props = {
    onClick: () => void;
}

export default function ThemeToggle({ onClick }: Props) {
    //TODO: This is not the right spot for this, but it works for now...
    document.body.style.backgroundColor = useTheme().colors.background1;
    return (
        <ButtonContainer onClick={onClick}>
            { useTheme().colors.theme === "light" ? <LightModeIcon/> : <DarkModeIcon/> }
        </ButtonContainer>
    );
}