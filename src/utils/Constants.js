import moment from "moment";
import { colors } from "app/themes/variables";

export const convertDatetoReportFormat = (dateObject) => {
  const formattedDate = {
    day: dateObject.getDate(),
    month: `0${dateObject.getMonth() + 1}`,
    year: dateObject.getFullYear(),
  };
  return formattedDate;
};

export const mapChangesToState = (state, value, setState) => {
  setState({ ...state, ...value });
};

export const isString = (string) => Object.prototype.toString.call(string);

export const capitalizeFirstLetter = (string) => {
  return (
    string &&
    isString(string) &&
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
};

export const converDatatoDropDownData = (data, label, value) => {
  return (
    data &&
    data.map((item) => ({ ...item, label: item[label], value: item[value] }))
  );
};

export const converDatatoReportsData = (data, name, value) => {
  return (
    data &&
    data.map((item) => ({ ...item, name: item[name], value: item[value] }))
  );
};

export const getOnlyLabelValuePair = (data) => {
  return data && data.map((item) => ({ label: item.label, value: item.value }));
};

export const isValueEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (value.hasOwnProperty("length") && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
};
export const returnBlankIfEmpty = (value) => {
  return isValueEmpty(value) ? "-" : value;
};

export const truncateText = (string, maxLength) => {
  return string.length > maxLength
    ? string.substring(-1, maxLength) + "..."
    : string;
};

export const getDateAndTime = (timestamp) => {
  return moment(timestamp).format("DD/MM/YYYY, hh:mm A");
};

export const getDaysDifferenceFromToday = (date) => {
  const today = Date.now();
  return Math.abs(getDifferenceInDays(date, today));
};

// returns the initials of a name (Considers only first and last string)
export const getMemberInitials = (name) => {
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 12)];
  }
  return color;
};

export const getDifferenceInDays = (date1, date2) =>
  moment(date1).diff(moment(date2), "days");

export const getColorBasedOnStatus = (status) => {
  switch (status) {
    case "OPEN": {
      return colors.openTicketBackground;
    }
    case "INPROGRESS": {
      return colors.inProgressTicketBackground;
    }
    case "CLOSED": {
      return colors.closedTicketBackground;
    }
    case "ESCALATED": {
      return colors.escalatedTicketBackground;
    }
    case "AWAITING": {
      return colors.awaitingTicketBackground;
    }
    case "RESOLVED": {
      return colors.awaitingTicketBackground;
    }
    default:
      return colors.xenieBlue;
  }
};

export const checkIfAllValuesAreZero = (data, value) => {
  const lengthCheckVariable = data.filter(
    (individualElement) => individualElement[value] === 0
  );
  return lengthCheckVariable.length === data.length;
};
