import { fetch } from "../modules/httpServices";
import { constants } from "../modules/constants";

export const getRatings = (setValues) => {
  fetch.get({
    url: constants.SERVICE_URLS.RATING,
    callbackHandler: (response) => {
      const {
        payload: { result, message },
      } = response;
      if (constants.SUCCESS === message) {
        const ratings = Object.keys(result).map((key, index) => {
          return { name: key, value: response.payload.result[key] };
        });
        setValues({
          rating: ratings,
        });
      }
    },
  });
};

export const getMissedvsAchieved = (currentDate, setValues) => {
  fetch.get({
    url:
      constants.SERVICE_URLS.MISSED_VS_ACHIEVED +
      `${currentDate.year}-${currentDate.month}`,
    callbackHandler: (response) => {
      const {
        payload: { message },
      } = response;

      if (constants.SUCCESS === message) {
        console.log("successss");
        const achieved_vs_missed = Object.keys(response.payload.result).map(
          (key, index) => {
            return {
              name: key.charAt(0).toUpperCase() + key.slice(1),
              value: response.payload.result[key],
            };
          }
        );
        setValues({
          achieved_vs_missed: achieved_vs_missed,
        });
      }
    },
  });
};

export const getSLAMissedByDept = (currentDate, setValues) => {
  fetch.get({
    url:
      constants.SERVICE_URLS.MISSED_BY_DEPARTMENT +
      `${currentDate.year}-${currentDate.month}`,
    callbackHandler: (response) => {
      const {
        payload: { data, message },
      } = response;

      if (constants.SUCCESS === message) {
        // console.log(achieved_vs_missed);

        setValues({
          slaByDept: data,
        });
      }
    },
  });
};

export const getSLAMissedByStatus = (setValues) => {
  fetch.get({
    url: constants.SERVICE_URLS.MISSED_BY_STATUS,
    callbackHandler: (response) => {
      const {
        payload: { data, message },
      } = response;
      // console.log(data);
      if (constants.SUCCESS === message) {
        const missedByStatus = Object.keys(data).map((key, index) => {
          return { name: data[key].status, value: data[key].count };
        }); // return {name: key, value: data[key]} console.log(data[key].status)
        setValues({
          status: missedByStatus,
        });
      }
    },
  });
};

export const getAverageEfficiency = (setValues) => {
  fetch.get({
    url: constants.SERVICE_URLS.AVERAGE_EFFICIENCY,
    callbackHandler: (response) => {
      const {
        payload: { data, message },
      } = response;
      let sum = 0;
      if (data) {
        for (let i of data) {
          sum += i.hoursToRespond;
        }
        let average = sum / data.length;
        setValues({
          averageHours: Math.round(average),
        });
      }
    },
  });
};
export const getSLAMissedByDate = (setValues) => {
  fetch.get({
    url: constants.SERVICE_URLS.SLA_DATE,
    callbackHandler: (response) => {
      const {
        payload: { data, message },
      } = response;
      if (constants.SUCCESS === message) {
        const slaMissedByDate = Object.keys(data).map((key, index) => {
          return {
            name: data[key].localDateTime,
            value: data[key].missedCount,
          };
        });
        setValues({
          statusByDate: slaMissedByDate,
        });
      }
    },
  });
};

export const getStatusCount = (setValues) => {
  fetch.get({
    url: constants.SERVICE_URLS.ADMIN_STATUS_COUNT,
    callbackHandler: (response) => {
      const { status, payload } = response;

      if (status === constants.SUCCESS) {
        setValues({
          departmentStatusCount: payload.result.departments,
          isDepartmentStatusCountValid: true,
        });
      } else {
        setValues({ isDepartmentStatusCountValid: false });
      }
    },
  });
};

export const getDepartments = (setValues) => {
  fetch.get({
    url: constants.SERVICE_URLS.GET_DEPARTMENTS,
    callbackHandler: (response) => {
      const {
        status,
        payload: {
          result: { departments },
        },
      } = response;
      if (status === constants.SUCCESS) {
        setValues({ departments: departments });
      }
    },
  });
};
