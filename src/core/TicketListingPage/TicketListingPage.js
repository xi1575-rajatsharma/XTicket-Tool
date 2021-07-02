import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import {
  navItems,
  errorText,
} from "../../app/utils/TicketListingNavigationUtils";
import * as actionCreators from "../../app/redux/actions/commonActions";
import * as styled from "./TicketListingPage.styled";
import * as GlobalStyled from "../../app/themes/GlobalStyles";
import TicketListingNavigation from "./TicketListingNavigation";
import TicketListingComponents from "./TicketListingComponents";
import Loader from "core/Loader/Loader";
import ComponentError from "core/ComponentError/ComponentError";

const TicketListingPage = (props) => {
  const [state, setState] = useState({
    selectedKey: "OPEN",
    menuItems: navItems,
  });

  const dispatch = useDispatch();
  const mapstateChanges = useCallback((value) => {
    setState({ ...state, ...value });
  }, []);

  useEffect(() => {
    dispatch(actionCreators.startTicketStatusLoader());
    dispatch(actionCreators.startAllAdminUsersLoader());
    dispatch(actionCreators.getAllStatus());
    dispatch(actionCreators.getAllAdminUsers());
    dispatch(actionCreators.getAllDepartments());
  }, []);

  useEffect(() => {
    if (
      props.common.allStatusData &&
      props.common.allStatusData.allStatus &&
      props.common.allStatusData.allStatus.length
    ) {
      const utilElement = {
        itemName: "Statuses",
        items: [],
      };
      const updatedStatusArray = props.common.allStatusData.allStatus.map(
        (status) => ({
          itemName:
            status.status.charAt(0).toUpperCase() +
            status.status.slice(1).toLowerCase(),
          key: status.status,
        })
      );
      utilElement.items = updatedStatusArray;
      if (navItems[0].itemName !== "Statuses") {
        const menuItems = navItems.unshift(utilElement);
        mapstateChanges(menuItems);
      }
    }
  }, [props.common.allStatus, props.common.allStatusData.allStatus]);

  const {
    allStatusData: { getAllStatusLoading, getAllStatusFailure },
    allAdminData: { allAdminUsersLoading, allAdminUsersFailure },
  } = props.common;
  return (
    <styled.TicketListingPage>
      {getAllStatusLoading || allAdminUsersLoading ? (
        <GlobalStyled.loaderContainer height={"95.3vh"}>
          <Loader
            height={"80px"}
            loadingText={"Hold On Tight. Engines heating up..."}
          />
        </GlobalStyled.loaderContainer>
      ) : getAllStatusFailure || allAdminUsersFailure ? (
        <ComponentError
          errorContainerStyles={styled.errorContainerStyles}
          paragraphStyles={styled.paragraphStyles}
          errorText={errorText}
        />
      ) : (
        <>
          <TicketListingNavigation
            selectedKey={state.selectedKey}
            mapstateChanges={mapstateChanges}
            navItems={state.menuItems}
          />
          <TicketListingComponents selectedKey={state.selectedKey} />
        </>
      )}
    </styled.TicketListingPage>
  );
};

const mapStatetoProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStatetoProps)(TicketListingPage);
