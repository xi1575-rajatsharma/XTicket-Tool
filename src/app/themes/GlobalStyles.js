import { createGlobalStyle } from "styled-components";
import { colors } from "./variables";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}
html{
    font-size: 62.5%;
    
}
::selection{
        color:${colors.colorWhite};
        background-color: ${colors.xenieBlue};
    }
body{
    font-family: 'Montserrat', sans-serif;
}

h3{
    font-size: 3rem;
    font-weight: 300;
}

`;

export default GlobalStyles;
