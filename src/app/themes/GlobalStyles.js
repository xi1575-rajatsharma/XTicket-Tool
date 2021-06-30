import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
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
    overflow: hidden;
}

h3{
    font-size: 3rem;
    font-weight: 300;
}

h6 {
    font-size: 1.3rem;
    font-weight: 400;

}
`;
export const loaderContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height};
`;

export default GlobalStyles;
