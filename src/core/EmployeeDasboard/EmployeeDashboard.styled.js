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
  min-height: 65vh;
  max-height: 65vh;
  overflow: auto;
  margin-top: 2rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 8px 8px transparent;
    border: solid 3px transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 8px 8px ${colors.xenieBlue};
    border: solid 3px transparent;
    border-radius: 8px;
  }
`;

export const loaderContainer = styled.div`
  margin-top: 1rem;
`;

export const noRecordsContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const noRecordsText = styled.p`
  font-size: 1.8rem;
  border: 1px solid ${colors.colorLightBorder};
  border-radius: 4px;
  font-weight: 600;
  color: ${colors.colorLightGrey};
  padding: 1.3rem;
`;

export const nav = styled.nav`
  font-size: 1.7rem;
  margin-top: 1.2rem;
  display: flex;
`;

export const navItem = styled.div`
  color: ${(props) => props.color || colors.colorLightGrey};
  font-weight: 600;
  padding-right: 1rem;
  margin-right: 1rem;
  border-right: 2px solid ${colors.colorLightGrey};
  cursor: pointer;
  transition: all 250ms ease-in-out;
  &:last-child {
    border-right: none;
  }
`;

export const filterBtn = styled.button`
  background-color: ${colors.xenieBlue};
  /* padding: 0.3rem; */
  border-radius: 6px;
  font-size: 1.4rem;
  border: none;
  color: ${colors.colorWhite};
  font-weight: 600;
`;

export const totalTickets = styled.div`
  color: ${colors.colorLightGrey};
`;
