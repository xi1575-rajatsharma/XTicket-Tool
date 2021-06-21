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
  width: 100%;
  height: 6vh;
  background-color: ${colors.colorWhite};
  padding: 0rem 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
};

export const motionProps = {
  initial: "hidden",
  animate: "visible",
  variants: item,
};
