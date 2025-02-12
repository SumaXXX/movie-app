import { useState } from 'react';
import MovieDBService from '../../movie-service';
import '@fontsource/inter/300.css';
import { Card, ConfigProvider, Tag } from 'antd';
import { format } from 'date-fns';

import './Card.css';

const { Meta } = Card;

const _Card = ({ id }) => {
  const _apiPosterbase = `https://image.tmdb.org/t/p/w500/`;

  const [movieDbId, setmovieDbId] = useState('');
  const [poster, setPoster] = useState('');
  const [movieName, setmovieName] = useState('');
  const [movieDescription, setmovieDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const [firstGenre, setFirstGenre] = useState(null);
  const [secondGenre, setSecondGenre] = useState(null);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    let truncated = text.slice(0, maxLength);

    // Находим последнее пробел для обрезки
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    return truncated + '...';
  }

  const getFormatedDate = (date) => {
    return format(new Date(date), 'MMMM d, y')
  };

  const movieDBService = new MovieDBService();

  const getMovieData = () => {
    const movies = movieDBService.getResource();
    movies.then((res) => {
      setPoster(res.results[id].poster_path);
      setmovieName(res.results[id].title);
      setmovieDescription(res.results[id].overview);
      setReleaseDate(getFormatedDate(res.results[id].release_date));
      setmovieDbId(res.results[id].id);
    });
  };

  const getMovieGenres = (movieDbId) => {
    const details = movieDBService.getDetails(movieDbId);
    details.then((res) => {
      if (res) {
        setFirstGenre(res.genres[0] ? res.genres[0].name : null);
        setSecondGenre(res.genres[1] ? res.genres[1].name : null);
      }
    });
  };

  

  getMovieData();
  getMovieGenres(movieDbId);

  return (
    <article className="movie-card">
      <img
        className="movie-card--poster"
        alt="example"
        src={`${_apiPosterbase}${poster}`}
      />
      <div className="movie-card--info">
        <ConfigProvider
          theme={{
            token: {
              fontSize: 18,
            },
          }}
        >
          <Card
            style={{
              border: 'none',
              fontSize: 12,
              width: 268,
              fontFamily: 'Inter',
            }}
          >
            <Meta title={movieName} description={releaseDate} />
            <div className="movie-card--info--genres">
              {firstGenre ? (
                <Tag style={{ fontSize: 12, color: 'grey' }}>{firstGenre}</Tag>
              ) : null}
              {secondGenre ? (
                <Tag style={{ fontSize: 12, color: 'grey' }}>{secondGenre}</Tag>
              ) : null}
            </div>
            <p className="movie-card--info--description">
              {truncateText(movieDescription, 180)}
            </p>
          </Card>
        </ConfigProvider>
      </div>
    </article>
  );
};

export default _Card;

{
  /* <ConfigProvider
theme={{
  token: {
    bodyPadding: 0,
  },
}}
>
<Card
  style={{ display: 'flex', width: 451, height: 279 }}
  className="movie-card"
>

</Card>
</ConfigProvider> */
}
