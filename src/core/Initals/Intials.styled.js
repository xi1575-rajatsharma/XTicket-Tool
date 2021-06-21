import styled from "styled-components";
import { colors } from "../../app/themes/variables";
export const container = styled.div`
  width: ${(props) => props.styles.size || "40px"};
  height: ${(props) => props.styles.size || "40px"};
  background-color: ${(props) => props.styles.color || "40px"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const nameContainer = styled.div`
  font-size: ${(props) => props.fontSize || "1.3rem"};
  font-weight: 600;
  color: ${colors.colorWhite};
`;
