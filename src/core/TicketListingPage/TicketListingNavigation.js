import React from "react";
import * as styled from "./TicketListingPage.styled";
import { colors } from "../../app/themes/variables";

const TicketListingNavigation = (props) => {
  const displayItemWithSubMenu = (itemwithSubMenu) => {
    return (
      <styled.menuContainer>
        <styled.menuHeading>{itemwithSubMenu.itemName}</styled.menuHeading>
        <styled.allSubMenuItems>
          {itemwithSubMenu.items.map((item) => {
            return (
              <styled.subMenuItem
                style={
                  props.selectedKey === item.key
                    ? {
                        backgroundColor: `${colors.itemSelectedBackground}`,
                      }
                    : null
                }
                onClick={() => props.mapstateChanges({ selectedKey: item.key })}
              >
                {item.itemName}
              </styled.subMenuItem>
            );
          })}
        </styled.allSubMenuItems>
      </styled.menuContainer>
    );
  };

  const displayItemWithoutSubMenu = (itemWithoutSubMenu) => {
    return (
      <styled.singleMenuHeading
        style={
          props.selectedKey === itemWithoutSubMenu.items[0].key
            ? {
                backgroundColor: `${colors.itemSelectedBackground}`,
                cursor: "pointer",
              }
            : { cursor: "pointer" }
        }
        onClick={() =>
          props.mapstateChanges({
            selectedKey: itemWithoutSubMenu.items[0].key,
          })
        }
      >
        {itemWithoutSubMenu.items[0].itemName}
      </styled.singleMenuHeading>
    );
  };
  return (
    <styled.NavContainer>
      {props.navItems.map((item) => {
        let hasSubMenu = false;
        if (item && item.items.length > 1) hasSubMenu = true;
        if (hasSubMenu) {
          return displayItemWithSubMenu(item);
        }
        return displayItemWithoutSubMenu(item);
      })}
    </styled.NavContainer>
  );
};

export default TicketListingNavigation;
