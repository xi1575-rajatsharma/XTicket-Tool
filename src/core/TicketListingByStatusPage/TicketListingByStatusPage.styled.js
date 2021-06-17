import styled from "styled-components";
import { colors } from "../../app/themes/variables";

export const container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  max-height: 82vh;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 8px;
    /* border: 1px solid black; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.xenieBlue};
    border-radius: 4px 0 0 4px;
  }
`;

export const header = styled.div`
  padding: 1.5rem 2.5rem;
  /* margin-bottom: 3rem; */
`;

export const heading = styled.h3``;
