import styled from "styled-components";
import { colors } from "../../app/themes/variables";

export const ticketContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.colorWhite};
  box-shadow: 0px 0.2rem 0.4rem rgba(156, 162, 166, 0.5);
  border-radius: 0.8rem;
  margin-bottom: 3rem;
`;

export const topContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;

export const bottomContainer = styled.div`
  display: flex;
`;

export const ticketIdAndStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
`;

export const ticketSubjectAndDescriptionContainer = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ticketId = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.xenieBlue};
  margin: 1.3rem 0 0.5rem 0;
`;
export const ticketStatus = styled.div`
  padding: 0.2rem 4rem;
  margin-bottom: 1.2rem;
  color: ${colors.colorWhite};
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${(props) => props.color};
`;

export const ticketSubject = styled.p`
  margin: 0.8rem 0 0.3rem 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${colors.xenieBlue};
`;

export const ticketDescription = styled.p`
  color: #909090;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

export const assigneeContainer = styled.div`
  flex-grow: 2;
  font-size: 12px;
  margin: 0.5rem 1rem 0 1rem;
`;

export const labelValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => ({ ...props.styles })};
  margin-left: 1rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border-right: 1px solid #dddddd;
`;

export const label = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.labelLightGrey};
`;

export const value = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.lightBlack};
`;

export const customStyles = "dropDownStyles";
