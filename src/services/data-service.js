import config from "./../config.json";
import http from "./http-module";

// const token = getToken();
http.setJwt(localStorage.getItem("token"));

export default class DataService {
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }
  url = id => `${config["api"]}/${this.resourceUrl}/${id ? id : ""}`;
  get = () => {
    return http.get(this.url());
  };

  delete = id => {
    return http.delete(this.url(id));
  };

  getById = id => {
    return http.get(this.url(id));
  };

  save = obj => {
    if (obj._id) {
      let sendObj = { ...obj };
      delete sendObj._id;
      return http.put(this.url(obj._id), sendObj);
    } else return http.post(this.url(), obj);
  };
}
