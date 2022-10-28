import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddPlaylistIcon from '../components/cardIcons/playlistAdd'

const UpcomingMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const mustwatch = movies.filter(m => m.watch)
  localStorage.setItem('mustwatch', JSON.stringify(mustwatch))
  const addToMustWatch = (movieId) => true 
  console.log(mustwatch)

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddPlaylistIcon movie={movie} />
      }}
    />
);

};
export default UpcomingMoviesPage;