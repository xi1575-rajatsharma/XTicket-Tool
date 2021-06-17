import styled from "styled-components";
import { colors } from "../../app/themes/variables";

export const container = styled.div`
  min-height: 4rem;
  border: 2px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
`;

export const title = styled.div`
  width: 100%;
  padding: 0.5rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  z-index: 1;
`;

export const header = styled.p`
  margin: 0 0 0 1rem;
  font-size: 1.3rem;
  color: #909090;
  font-weight: 500;
  z-index: 1;
`;

export const dropImage = styled.img`
  height: 1.2rem;
  margin-right: 0.7em;
`;

export const dropDownList = styled.div`
  width: 100%;
  position: absolute;
  top: 4rem;
  background-color: ${colors.colorWhite};
  max-height: 9rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    /* border: 1px solid black; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.xenieBlue};
    border-radius: 4px 0 0 4px;
    z-index: 2;
  }
`;
export const option = styled.div`
  background-color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 1rem;
  user-select: none;
  transition: all 250ms;
  z-index: 2;
  &:hover {
    background-color: ${colors.optionHOverBlue};
  }
`;
