import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../app/themes/variables";

export const container = styled(motion.div)`
  position: absolute;
  top: 5.1vh;
  right: 0;
  background-color: ${colors.backgroundGrey};
  width: 35%;
  height: 94.9vh;
  box-shadow: -6px 3px 9px 0px ${colors.boxShadowSlider};
`;

export const header = styled.div`
  position: relative;
  background-color: ${colors.colorWhite};
  padding: 0rem 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px 0px rgba(133, 133, 133, 0.221);
`;
export const nameAndInitalsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
`;

export const initialsContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const nameContainer = styled.p`
  margin: 0 0 0.2rem 0.5rem;
  font-weight: 500;
  color: ${colors.fontLightBlack};
`;

export const daysContainer = styled.p`
  margin-top: 1rem;
  color: ${colors.colorLightGrey};
  font-weight: 500;
`;

export const closeBtn = styled.a`
  position: absolute;
  background-color: ${colors.xenieBlueLight};
  color: #fff !important;
  padding: 0.3rem 1.1rem;
  left: -4.11094rem;
  top: 0.0828125rem;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  img {
    height: 18px;
  }
`;

// BODY STYLES

export const body = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  overflow-y: auto;
`;

export const subject = styled.div`
  /* margin: 1rem 0 0 2.3rem; */
  font-size: 2.2rem;
  color: ${colors.previewHeaderText};
`;

export const linktToDetails = styled.div`
  width: 50%;
  margin: 1rem auto;
  text-decoration: underline;
  font-size: 1.3rem;
`;

export const ticketDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  background-color: ${colors.colorWhite};
  padding: 1.5rem;
  border-radius: 6px;
  color: ${colors.fontLightBlack};
`;

export const createdOn = styled.div`
  margin: 0.5rem 0 0 auto;
  font-size: 1rem;
  color: ${colors.colorLightGrey};
`;
// framer motion stuff
const item = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      x: { type: "spring", stiffness: 150, damping: 18 },
    },
  },
  hidden: { opacity: 0, x: 700 },
  exit: { opacity: 0 },
};
export const exit = {};

export const motionProps = {
  initial: "hidden",
  animate: "visible",
  variants: item,
  exit: { x: 1000, opacity: 0 },
};
