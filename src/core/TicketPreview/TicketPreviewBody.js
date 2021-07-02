import React from "react";
import { Link } from "react-router-dom";
import Conversations from "core/Conversations/Conversations";
import {
  capitalizeFirstLetter,
  getDateAndTime,
  truncateText,
} from "utils/Constants";
import * as styled from "./TicketPreview.styled";
import { linkText } from "./TicketPreviewUtils";

const TicketPreviewBody = (props) => {
  return (
    <styled.body>
      <styled.subject>
        {capitalizeFirstLetter(truncateText(props.data.subject, 50))}
      </styled.subject>
      <Link to={"/ticketlist/" + props.data.id}>
        <styled.linktToDetails>{linkText}</styled.linktToDetails>{" "}
      </Link>
      <styled.ticketDescription>
        {props.data.description.length ? (
          <>
            {props.data.description}
            <styled.createdOn>
              {getDateAndTime(props.data.creationTime)}
            </styled.createdOn>
          </>
        ) : (
          "No Description Available"
        )}
      </styled.ticketDescription>
      <Conversations data={props.conversations} />
    </styled.body>
  );
};

export default TicketPreviewBody;
