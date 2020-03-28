import DataService from "./data-service";
const resource = "movies";
class MoviesService extends DataService {
  constructor() {
    super(resource);
  }
}

const moviesService = new MoviesService();

export const getMovies = moviesService.get;
export const deleteMovie = moviesService.delete;
export const getMovie = moviesService.getById;
export const saveMovie = moviesService.save;
