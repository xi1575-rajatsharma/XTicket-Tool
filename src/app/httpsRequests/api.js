/*eslint-disable*/
import { logoutUser } from "app/redux/actions/loginActions";
import http from "axios";
import axios from "axios";
import { defaultTimeoutAPI } from "./Constants";

class XenieApi {
  static baseHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  static baseUrl() {
    return "";
  }
  static get(route, headers, params, timeout, responseType = null) {
    return this.api("get", route, headers, params, {}, timeout, responseType);
  }

  static put(route, headers, params, data, timeout, responseType = null) {
    return this.api("put", route, headers, params, data, timeout, responseType);
  }

  static post(route, headers, params, data, timeout, responseType = null) {
    return this.api(
      "post",
      route,
      headers,
      params,
      data,
      timeout,
      responseType
    );
  }

  static patch(route, headers, params, data, timeout, responseType = null) {
    return this.api(
      "patch",
      route,
      headers,
      params,
      data,
      timeout,
      responseType
    );
  }

  static delete(route, headers, params, data, timeout, responseType = null) {
    return this.api(
      "delete",
      route,
      headers,
      params,
      data,
      timeout,
      responseType
    );
  }

  static api(requestType, route, headers, params, data, timeout, responseType) {
    const host = XenieApi.baseUrl();
    const url = `${host}${route}`;
    const baseHeaders = XenieApi.baseHeaders();

    const requestConfig = {
      headers: headers ? Object.assign({}, baseHeaders, headers) : baseHeaders,
    };

    if (params) {
      requestConfig.params = params;
    }

    if (responseType) {
      requestConfig.responseType = responseType;
    }

    http.create();
    http.defaults.timeout = timeout;
    axios.interceptors.request.use(
      function (config) {
        const token = window.localStorage.getItem("xenieToken");

        if (token !== null) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      function (err) {
        return Promise.reject(err);
      }
    );
    axios.interceptors.response.use(
      (next) => {
        return Promise.resolve(next);
      },
      (error) => {
        if (error.response) {
          if (error.response.status == 403) {
            // window.localStorage.removeItem("xenieToken")
            // window.location.replace("./")
          }
        }
        return Promise.reject(error);
      }
    );

    if (requestType === "get" || requestType === "delete") {
      return http[requestType](url, requestConfig)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    return http[requestType](url, data, requestConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("error for post", error);
        // const _error = customErrorHandler.getErrorDetails(error);
        return Promise.reject(error);
      });
  }
}

export default XenieApi;
