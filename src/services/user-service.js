import DataService from "./data-service";
const resource = "users";
class UserService extends DataService {
  constructor() {
    super(resource);
  }
}

const userService = new UserService();

// export const getMovies = moviesService.get;
// export const deleteMovie = moviesService.delete;
// export const getMovie = moviesService.getById;
export const saveUser = userService.save;
