import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "core/Loader/Loader";
import ComponentError from "core/ComponentError/ComponentError";
import {
  getDaysDifferenceFromToday,
  truncateText,
  capitalizeFirstLetter,
} from "utils/Constants";
import { errorText, noConverSations } from "./ConversationsUtils";
import Attachment from "app/images/Attachment.svg";
import Download from "app/images/Download.svg";
import File from "app/images/File.svg";
import * as styled from "./Conversations.styled";
import Initials from "core/Initals/Initials";

const Conversations = (props) => {
  const { allReplies, getAllRepliesFailure, getAllRepliesLoading } = props.data;

  const [state, setState] = useState({
    currentOpenReply: "",
    initalsColor: null,
  });
  useEffect(() => {
    if (allReplies && allReplies.length) {
      const lastElementId = allReplies.slice(-1)[0].id;
      mapChangesToState({ currentOpenReply: lastElementId });
    }
  }, [allReplies]);
  const mapChangesToState = (value) => setState({ ...state, ...value });

  return (
    <styled.container>
      {getAllRepliesLoading ? (
        <Loader loadingText="Loading Conversations" />
      ) : getAllRepliesFailure ? (
        <ComponentError
          errorContainerStyles={styled.errorContainerStyles}
          paragraphStyles={styled.paragraphStyles}
          errorText={errorText}
        />
      ) : (
        <>
          {allReplies && Array.isArray(allReplies) && allReplies.length ? (
            allReplies.map((reply) => {
              const intialsProps = {
                fullName: reply.createdBy,
                size: "28px",
                fontSize: "1.3rem",
              };
              const differenceInDays = getDaysDifferenceFromToday(
                reply.createdOn
              );

              return (
                <styled.reply
                  key={reply.id}
                  onClick={() =>
                    mapChangesToState({ currentOpenReply: reply.id })
                  }
                >
                  <styled.replyHeader>
                    <Initials {...intialsProps} />
                    <styled.createdBy>
                      <div>{reply.createdBy}</div>
                      <div>
                        {reply.createdOn && differenceInDays === 0
                          ? "Today"
                          : `${differenceInDays} ${
                              differenceInDays <= 1 ? "day" : "days"
                            } ago`}
                      </div>
                    </styled.createdBy>
                    {reply.s3ReplyUrl ? (
                      <styled.attachmentIcon src={Attachment} />
                    ) : null}
                  </styled.replyHeader>
                  <AnimatePresence>
                    {state.currentOpenReply === reply.id ? (
                      <styled.replyBody style={{ originY: 0, originX: 0 }}>
                        <styled.replyText>{reply.text || ""}</styled.replyText>
                        {reply.s3ReplyUrl ? (
                          <styled.attachmentContainer>
                            <styled.fileName>
                              <styled.fileIcon src={File} />
                              <styled.fileText title={reply.fileName}>
                                {reply.fileName.length > 15
                                  ? `${capitalizeFirstLetter(
                                      truncateText(reply.fileName, 10)
                                    )}...${reply.fileExtension}`
                                  : reply.fileName}
                              </styled.fileText>
                            </styled.fileName>
                            <styled.replyAttachment href={reply.s3ReplyUrl}>
                              <styled.attachmentIcon src={Download} />
                            </styled.replyAttachment>
                          </styled.attachmentContainer>
                        ) : null}
                      </styled.replyBody>
                    ) : null}
                  </AnimatePresence>
                </styled.reply>
              );
            })
          ) : (
            <styled.noConversationsText>
              {noConverSations}
            </styled.noConversationsText>
          )}
        </>
      )}
    </styled.container>
  );
};

export default Conversations;
