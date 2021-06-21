import axios from "axios";

// Create an Axios Client with defaults
const client = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

const onSuccess = function (response) {
  return response.data;
};

const onError = function (error) {
  console.error("Request Failed:", error.config);
  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
    console.log("Headers:", error.response.headers);
  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.log("Error Message:", error.message);
  }
  return Promise.reject(error.response || error.message);
};

// Request Wrapper with default success/error actions
const request = async function (options) {
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
