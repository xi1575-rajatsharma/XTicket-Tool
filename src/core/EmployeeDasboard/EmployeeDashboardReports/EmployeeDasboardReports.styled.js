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
  /* padding: 0 2rem; */
  margin-top: 2rem;
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
`;
export const reportsContainer = styled.div`
  width: 100%;
  display: flex;
`;
export const pieChartContainer = styled.div`
  width: 48%;
  height: 50vh;
  background-color: ${colors.colorWhite};

  border-radius: 4px;
  padding: 1.5rem;
  box-shadow: 0px 0.2rem 0.4rem rgba(156, 162, 166, 0.5);
  margin: 2rem 3rem 0 0;

  &:last-child {
    margin-right: 0;
  }
`;

export const pieChartHeader = styled.h4`
  font-size: 1.7rem;
  line-height: 1.9rem;
  color: ${colors.colorLightGrey};
`;

export const pieContainer = styled.div``;

export const noDataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const noDataText = styled.p`
  font-size: 1.3rem;
  padding: 1rem;
  border: 1px solid ${colors.colorLightGrey};
`;

export const paragraphStyles = {
  padding: "1rem",
  fontSize: "1.2rem",
  color: `${colors.errorRedBorder}`,
};

export const errorContainerStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  padding: "0 27%",
  "align-items": "center",
  "justify-content": "center",
  overflow: "hidden",
};
