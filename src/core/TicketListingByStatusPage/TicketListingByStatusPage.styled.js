import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../app/themes/variables";

export const container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2.5rem;

  height: 82vh;
  overflow: auto;
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

export const header = styled.div`
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
`;

export const heading = styled.h3``;

export const noTicketsContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: ${colors.lightBlack};
`;

export const noTicketsText = styled.p`
  border: 1px solid ${colors.lightBlack};
  border-radius: 4px;
  padding: 2rem;
`;

export const paginationContainer = styled.div``;

export const paragraphStyles = {
  padding: "1.8rem",
  fontSize: "1.5rem",
  color: `${colors.errorRedBorder}`,
};

export const errorContainerStyles = {
  width: "100%",
  height: "95.3vh",
  display: "flex",
  padding: "0 30%",
  "align-items": "center",
  "justify-content": "center",
  overflow: "hidden",
};

export const pageTracker = styled.p`
  font-size: 1.3rem;
  color: ${colors.colorLightGrey};
  margin-left: auto;
`;
