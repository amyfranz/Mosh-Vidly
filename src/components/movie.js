import React, { Component } from "react";
import {
  getMovies,
  deleteMovie,
  likeMovie,
} from "../services/fakeMovieService";
import Like from "./common/like";

export default class movie extends Component {
  constructor() {
    super();
    this.state = { movies: getMovies() };
  }
  render() {
    const length = this.state.movies.length;
    if (length < 1) return <p>There are no movies in the database.</p>;
    return (
      <div>
        <p>Showing {this.state.movies.length} movies in the database.</p>
        <table className="table">
          <thead>
            <tr key="heading">
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like movie={movie} handleLike={this.handleLike} />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      deleteMovie(movie._id);
                      this.setState({ movies: getMovies() });
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
}
