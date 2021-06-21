import styled from "styled-components";
import { colors } from "../../app/themes/variables";
export const errorContainer = styled.div`
  ${(props) => ({ ...props.errorContainerStyles })}
`;

export const errorText = styled.p`
  border: 1px solid ${colors.errorRedBorder};
  ${(props) => ({ ...props.paragraphStyles })}
`;
