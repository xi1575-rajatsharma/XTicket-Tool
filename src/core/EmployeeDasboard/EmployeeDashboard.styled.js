import styled from "styled-components";
import { colors } from "app/themes/variables";

export const container = styled.div``;

export const header = styled.section`
  padding: 1.5rem 2rem;
`;

export const heading = styled.h3``;
export const body = styled.section`
  padding: 0 2rem;
`;

export const selectSubHeading = styled.h6`
  font-size: 1.7rem;
  font-weight: 500;
  color: ${colors.colorLightGrey};
`;

export const dropDownContainer = styled.div`
  width: 35rem;
  height: 4rem;
  margin-top: 1rem;
  display: inline-grid;
`;

export const filterContainer = styled.div`
width: 10rem;
height: 4rem;
display: inline-grid;
margin-top: 1rem;
margin-left: 2rem;
`;

export const ticketContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2.5rem;
  max-height: 70vh;
  overflow: auto;
  margin-top: 2rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px 10px transparent;
    border: solid 3px transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 10px 10px ${colors.xenieBlue};
    border: solid 3px transparent;
    border-radius: 8px;
  }
`;

export const loaderContainer = styled.div`
  margin-top: 1rem;
`;
