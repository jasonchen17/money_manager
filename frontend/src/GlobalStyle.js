import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: Geneva, Verdana, sans-serif;
        color: #808080;
    }

    body{
        background-color: #191919;
        min-height: 100vh;
    }
`;