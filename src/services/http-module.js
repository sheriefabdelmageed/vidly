import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logger";
import message from "./message";

axios.interceptors.response.use(null, error => {
  try {
    const status = error.response.status;
    if (status >= 400 && status < 500) {
      return Promise.reject(error);
    }
    logger.log(error);
    toast.error(message.INTERNAL_SERVER_ERROR);
  } catch (error) {
    return Promise.reject(error);
  }
});

const setJwt = jwt => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
