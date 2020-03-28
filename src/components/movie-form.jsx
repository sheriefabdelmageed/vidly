import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genre-service";
import { getMovie, saveMovie } from "../services/movies-service";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .min(5)
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
      .max(10)
      .label("Daily rental rate")
  };

  async populateGenres() {
    const { data } = await getGenres();
    const genres = data;
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const id = this.props.match.params.id;
      if (id === "new") {
        return;
      }
      const movie = (await getMovie(id)).data;
      if (!movie) return this.props.history.replace("/not-found");
      this.setState({ data: this.handleMovieModel(movie) });
    } catch (error) {
      return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  handleMovieModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
      toast.success("saved succefully");
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
      if (error.response.status === 404) toast.error("Not Found");
    }
  };

  render() {
    return (
      <div>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text", true)}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily rental rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
