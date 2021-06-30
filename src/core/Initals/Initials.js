import React, { useCallback } from "react";
import {
  returnBlankIfEmpty,
  getMemberInitials,
  getRandomColor,
} from "../../utils/Constants";
import * as styled from "./Intials.styled";
const Initials = ({ size, fullName, fontSize }) => {
  const color = useCallback(() => {
    return getRandomColor();
  }, []);

  const styles = {
    size,
    color: color(),
  };
  return (
    <styled.container styles={styles}>
      <styled.nameContainer fontSize={fontSize}>
        {fullName && returnBlankIfEmpty(getMemberInitials(fullName))}
      </styled.nameContainer>
    </styled.container>
  );
};

export default React.memo(Initials);
