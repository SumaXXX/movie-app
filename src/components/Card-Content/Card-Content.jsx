import { truncateText } from '../../usefullFunctions';
import { Card, ConfigProvider, Tag } from 'antd';
const { Meta } = Card;

const CardContent = ({
  movie: {
    poster,
    movieName,
    movieDescription,
    releaseDate,
    firstGenre,
    secondGenre,
  },
}) => {
  const _apiPosterbase = `https://image.tmdb.org/t/p/w500/`;
  return (
    <>
      <img
        className="movie-card--poster"
        alt="poster"
        src={poster ? `${_apiPosterbase}${poster}`: '/noImage.png'}
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
              width: 258,
              fontFamily: 'Inter',
            }}
          >
            <Meta title={movieName} description={releaseDate} />
            <div className="movie-card--info--genres">
              {firstGenre ? (
                <Tag
                  style={{
                    fontSize: 12,
                    color: 'grey',
                  }}
                >
                  {firstGenre}
                </Tag>
              ) : null}
              {secondGenre ? (
                <Tag
                  style={{
                    fontSize: 12,
                    color: 'grey',
                  }}
                >
                  {secondGenre}
                </Tag>
              ) : null}
            </div>
            <p className="movie-card--info--description">
              {truncateText(movieDescription, 160)}
            </p>
          </Card>
        </ConfigProvider>
      </div>
    </>
  );
};

export default CardContent;
