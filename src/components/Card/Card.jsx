import { useState } from 'react';
import MovieDBService from '../../movie-service';
import { format } from 'date-fns';
import CardContent from '../Card-Content/Card-Content';
import Spinner from '../Spinner/Spinner';
import '@fontsource/inter/300.css';


import './Card.css';


const _Card = ({ id, page, isErrors }) => {

  const [movieDbId, setmovieDbId] = useState(null);


  const [poster, setPoster] = useState(null);
  const [movieName, setmovieName] = useState(null);
  const [movieDescription, setmovieDescription] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [firstGenre, setFirstGenre] = useState(null);
  const [secondGenre, setSecondGenre] = useState(null);

  const getFormatedDate = (date) => {
    return format(new Date(date), 'MMMM d, y');
  };

  const onError = (err) => {
    isErrors(err)
    console.log(err)
  }

  const movieDBService = new MovieDBService();

  function getMovieData() {
    const movies = movieDBService.getResource(page);
    movies.then((res) => {
      setPoster(res.results[id].poster_path);
      setmovieName(res.results[id].title);
      setmovieDescription(res.results[id].overview);
      setReleaseDate(getFormatedDate(res.results[id].release_date));
      setmovieDbId(res.results[id].id);
    }).catch(onError);
  }

  const getMovieGenres = (movieDbId) => {
    const details = movieDBService.getDetails(movieDbId);
    details.then((res) => {
      if (res) {
        setFirstGenre(res.genres[0] ? res.genres[0].name : null);
        setSecondGenre(res.genres[1] ? res.genres[1].name : null);
      }
    }).catch(onError);
  };

  getMovieData();
  getMovieGenres(movieDbId);

  let movie = {
    poster,
    movieName,
    movieDescription,
    releaseDate,
    firstGenre,
    secondGenre,
  };

  let content = (movie.movieName || movie.poster) ? <CardContent movie={movie} /> : <Spinner/>

  return (
    <article className="movie-card">
     {content}
    </article>
  );
};

export default _Card;
