import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            theme: string;
            background1: string,
            text1: string,
            border1: string
        };
    }
}