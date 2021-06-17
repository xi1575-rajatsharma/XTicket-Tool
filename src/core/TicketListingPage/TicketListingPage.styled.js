import styled from "styled-components";
import { colors } from "../../app/themes/variables";

export const TicketListingPage = styled.div`
  width: 100%;
  min-height: 95.3vh;
  display: flex;
`;

export const NavContainer = styled.div`
  width: 20%;
  max-height: 100%;
  padding: 0.5rem;
  padding-left: 2.2rem;
  padding-top: 2.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.xenieBlue};
  color: ${colors.colorWhite};
`;

export const menuContainer = styled.div`
  margin-bottom: 2.2rem;
`;
export const menuHeading = styled.h6`
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.4rem;
  width: 110%;
  cursor: default;
`;

export const singleMenuHeading = styled.h6`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.4rem;
  width: 110%;
  &:hover {
    background-color: ${colors.itemSelectedBackground};
  }
  transition: all 250ms;
`;

export const allSubMenuItems = styled.div``;

export const subMenuItem = styled.div`
  width: 100%;
  padding: 0.4rem;
  padding-left: 0.6rem;
  font-size: 1.4rem;
  line-height: 2.1rem;
  margin: 0 0 0.3rem 0.8rem;
  cursor: pointer;
  border-radius: 0.4rem;

  &:hover {
    background-color: ${colors.itemSelectedBackground};
  }
  transition: all 250ms;
`;

export const ticketListingComponent = styled.div`
  width: 80%;
  background-color: ${colors.backgroundGrey};
  /* width: 100%; */
`;
