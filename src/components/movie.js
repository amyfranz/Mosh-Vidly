import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import MovieTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import SearchBox from "./common/searchBox.jsx";
import _ from "lodash";

export default class movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: null,
      searchQuery: "",
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genre = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genre,
    });
  }

  render() {
    const {
      pageSize,
      currentPage,
      genre,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { count, movies } = this.getPagedData();

    if (count < 1) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genre}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.onDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            count={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
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
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, search: "", currentPage: 1 });
  };
  onDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const count = sorted.length;

    const movies = paginate(sorted, currentPage, pageSize);

    return { count, movies };
  };
}
