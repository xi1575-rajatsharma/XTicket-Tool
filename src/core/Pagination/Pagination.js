import React from "react";
import arrowLeft from "app/images/ArrowLeft.svg";
import arrowLeftDisabled from "app/images/ArrowLeftDisabled.svg";
import arrowRightDisabled from "app/images/ArrowRightDisabled.svg";
import arrowRight from "app/images/ArrowRight.svg";
import * as styled from "./Pagination.styled";

const Pagination = (props) => {
  return (
    <styled.container>
      {/* <styled.pageNumber>{props.currentPage}</styled.pageNumber> */}
      <styled.arrowsContainer>
        <styled.arrowContainer
          onClick={props.currentPage > 1 ? props.prevPage : null}
        >
          <img
            src={props.currentPage === 1 ? arrowLeftDisabled : arrowLeft}
            alt="Previous"
          />
        </styled.arrowContainer>
        <styled.verticalDivider />
        <styled.arrowContainer
          onClick={props.currentPage !== props.maxPages ? props.nextPage : null}
        >
          <img
            src={
              props.currentPage === props.maxPages
                ? arrowRightDisabled
                : arrowRight
            }
            alt="Next"
          />
        </styled.arrowContainer>
      </styled.arrowsContainer>
      {/* <styled.pageNumber>{props.maxPages}</styled.pageNumber>  */}
    </styled.container>
  );
};

export default Pagination;
