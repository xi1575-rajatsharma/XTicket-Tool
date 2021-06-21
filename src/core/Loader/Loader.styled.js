import styled from "styled-components";
import { colors } from "../../app/themes/variables";

export const container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const loadingText = styled.div`
  font-size: 1.5rem;
  margin-top: 1.3rem;
  color: ${colors.fontLightBlack};
`;
