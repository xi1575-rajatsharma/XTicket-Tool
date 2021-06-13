import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import { navItems } from "../../app/utils/TicketListingNavigationUtils";
import * as actionCreators from "../../app/redux/actions/commonActions";
import * as styled from "./TicketListingPage.styled";
import TicketListingNavigation from "./TicketListingNavigation";
import TicketListingComponents from "./TicketListingComponents";

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
    dispatch(actionCreators.getAllStatus());
  }, []);

  useEffect(() => {
    if (props.common.allStatus && props.common.allStatus.length) {
      const utilElement = {
        itemName: "Statuses",
        items: [],
      };
      const updatedStatusArray = props.common.allStatus.map((status) => ({
        itemName:
          status.status.charAt(0).toUpperCase() +
          status.status.slice(1).toLowerCase(),
        key: status.status,
      }));
      utilElement.items = updatedStatusArray;
      console.log(navItems[0].items.length);
      if (navItems[0].itemName !== "Statuses") {
        const menuItems = navItems.unshift(utilElement);
        mapstateChanges(menuItems);
      }
    }
  }, [props.common.allStatus]);

  return (
    <styled.TicketListingPage>
      <TicketListingNavigation
        selectedKey={state.selectedKey}
        mapstateChanges={mapstateChanges}
        navItems={state.menuItems}
      />
      <TicketListingComponents selectedKey={state.selectedKey} />
    </styled.TicketListingPage>
  );
};

const mapStatetoProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStatetoProps)(TicketListingPage);
