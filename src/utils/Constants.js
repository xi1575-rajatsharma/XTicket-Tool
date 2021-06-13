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
