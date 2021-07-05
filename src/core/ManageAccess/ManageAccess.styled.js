import styled from "styled-components";
import { colors } from "app/themes/variables";

export const container = styled.div`
  width: 100%;
  height: 100%;
`;

export const header = styled.section`
  padding: 1.5rem 2rem;
`;

export const heading = styled.h3``;

export const body = styled.section`
  padding: 0 2rem;
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

export const input = styled.input`
  height: 4rem;
  font-size: 1.4rem;
  border-radius: 4px;
`;

export const searchUserBtn = styled.button`
  background-color: ${colors.xenieBlue};
  width: 10rem;
  font-size: 1.3rem;
  color: ${colors.colorWhite};
`;

export const label = styled.label`
  font-size: 1.7rem;
  padding: 0.5rem;
  color: ${colors.colorLightGrey};
  font-weight: 500;
`;

export const select = styled.select`
  height: 4rem;
  font-size: 1.4rem;
`;

export const addBtn = styled.button`
  background-color: ${colors.xenieBlue};
  width: 10rem;
  font-size: 1.3rem;
  padding: 0.6rem;
  border-radius: 4px;
  border: none;
  color: ${colors.colorWhite};
  margin-top: 1.5rem;
`;

export const disableAccessContainer = styled.div``;

export const table = styled.table``;
