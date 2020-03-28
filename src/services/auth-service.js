import JwtDecode from "jwt-decode";
import DataService from "./data-service";

const resource = "auth";
const authToken = "token";

class AuthService extends DataService {
  constructor() {
    super(resource);
  }

  setToken = jwt => {
    localStorage.setItem(authToken, jwt);
  };

  getToken = () => {
    return localStorage.getItem(authToken);
  };

  getUser = () => {
    try {
      const token = this.getToken();
      const user = JwtDecode(token);
      return user;
    } catch (error) {
      return;
    }
  };

  clearToken = () => {
    localStorage.removeItem(authToken);
  };

  isLoggenIn = () => {
    const token = getToken();
    return token ? true : false;
  };

  isAdmin = () => {
    const user = getUser();
    return user && user.isAdmin ? true : false;
  };
}

const authService = new AuthService();

export const login = authService.save;
export const setToken = authService.setToken;
export const getToken = authService.getToken;
export const getUser = authService.getUser;
export const logout = authService.clearToken;
export const isLoggenIn = authService.isLoggenIn;
export const isAdmin = authService.isAdmin;
