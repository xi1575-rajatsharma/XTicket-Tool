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
