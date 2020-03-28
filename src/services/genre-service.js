import config from "./../config.json";
import http from "./http-module";

const url = config["api"];
export const getGenres = () => {
  return http.get(`${url}/genres`);
};
