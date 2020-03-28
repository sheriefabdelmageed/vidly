import React, { Component } from "react";
import { getGenres } from "./../services/genre-service";
import MoviesTable from "./movies-tables";
import Pagination from "./common/pagination";
import paginate from "./../utils/paginate";
import ListGroup from "./common/list-group";
import Like from "./common/like";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/search-box";
import { getMovies, deleteMovie } from "./../services/movies-service";
import { toast } from "react-toastify";
import { isLoggenIn, isAdmin } from "./../services/auth-service";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortedItem: { path: "", order: "" },
    selectedItemId: null,
    searchedQuery: "",
    columns: [
      {
        columnName: "Title",
        columnPath: "title",
        content:
          isLoggenIn() &&
          (movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>)
      },
      { columnName: "Genre", columnPath: "genre.name" },
      { columnName: "Stock", columnPath: "numberInStock" },
      { columnName: "Rate", columnPath: "dailyRentalRate" },
      {
        key: "Like",
        content: movie => (
          <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
        )
      },
      {
        key: "Delete",
        content:
          isAdmin() &&
          (movie => (
            <button
              onClick={() => this.removeMovie(movie)}
              className="btn btn-danger btn-sm"
            >
              X
            </button>
          ))
      }
    ]
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All genres", _id: null }, ...data];
    const movies = (await getMovies()).data;
    this.setState({ movies: movies, genres: genres });
  }

  handleLike = movie => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  removeMovie = async movie => {
    const original = this.state.movies;
    const movies = this.state.movies.filter(e => e._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      return toast.success("Movie removed succesfully");
    } catch (error) {
      this.setState({ movies: original });
      if (error.response.status === 404) return toast.error("Not Found");
      else if (error.response.status === 400) return toast.error("Bad Request");
      else if (error.response.status === 403)
        return toast.error("Forbidden user");
      else return toast.error("Something went wrong");
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearchItemChane = item => {
    this.setState({
      selectedItemId: item._id,
      currentPage: 1,
      searchedQuery: ""
    });
  };

  handleSearch = query => {
    this.setState({
      searchedQuery: query,
      selectedItemId: null,
      currentPage: 1
    });
  };

  handleSort = sortedItem => {
    this.setState({ sortedItem });
  };

  getData = () => {
    const {
      currentPage,
      pageSize,
      sortedItem,
      movies: allMovies,
      searchedQuery
    } = this.state;

    let filterd = allMovies;
    if (searchedQuery) {
      filterd = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchedQuery.toLowerCase())
      );
    } else if (this.state.selectedItemId) {
      filterd = allMovies.filter(
        m => m.genre._id === this.state.selectedItemId
      );
    }

    const sorted = _.orderBy(filterd, [sortedItem.path], [sortedItem.order]);

    const movies = paginate(sorted, pageSize, currentPage);

    return { totalCount: filterd.length, movies, sorted };
  };

  render() {
    if (this.state.movies.length === 0) return <p>No movies found</p>;

    const { totalCount: count, movies, sorted } = this.getData();

    const {
      currentPage,
      pageSize,
      columns,
      movies: allMovies,
      searchedQuery
    } = this.state;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemChange={this.handleSearchItemChane}
            selectedItemId={this.state.selectedItemId}
          />
        </div>
        <div className="col">
          <h4>
            Total movies is <b>{sorted.length}</b> movie
          </h4>
          <hr />
          <div className="table-responsive">
            {isLoggenIn() && (
              <Link to="/movies/new" className="btn btn-primary mb-2">
                + New Movie
              </Link>
            )}
            <SearchBox onChange={this.handleSearch} value={searchedQuery} />
            <MoviesTable
              columns={columns}
              movies={movies}
              allMovies={allMovies}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              sortedItem={this.state.sortedItem}
              onDelete={this.removeMovie}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              count={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
