import styled from "styled-components";
import { colors } from "app/themes/variables";

export const container = styled.section`
  margin-top: 1rem;
`;
export const paragraphStyles = {
  padding: "1rem",
  fontSize: "1.2rem",
  color: `${colors.errorRedBorder}`,
};

export const errorContainerStyles = {
  width: "100%",
  height: "20vh",
  display: "flex",
  padding: "0 27%",
  "align-items": "center",
  "justify-content": "center",
  overflow: "hidden",
};

export const reply = styled.div``;
export const replyHeader = styled.div`
  display: flex;
  background-color: ${colors.colorWhite};
  border-radius: 6px 6px 0 0;
  border-top: 0.5px solid #eee;
  padding: 1rem;
  cursor: pointer;
`;
export const replyBody = styled.div`
  background-color: ${colors.colorWhite};
  padding: 1rem;
  border-radius: 0 0 6px 6px;
`;

export const createdBy = styled.h6`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  color: ${colors.colorLightGrey};
`;

export const attachmentIcon = styled.img`
  margin-left: auto;
  height: 20px;
`;

export const noConversationsText = styled.div`
  width: 41%;
  font-size: 1.3rem;
  margin: 4rem auto;
  color: ${colors.colorLightGrey};
  font-weight: 500;
`;

export const replyText = styled.div`
  word-break: break-word;
  font-size: 1.2rem;
  line-height: 1.9rem;

  color: ${colors.fontLightBlack};
`;

export const replyAttachment = styled.a`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
