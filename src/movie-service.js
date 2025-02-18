export default class MovieDBService {
  _apiBaseRated = 'https://api.themoviedb.org/3/movie/top_rated';
  _apiBasePopular = 'https://api.themoviedb.org/3/movie/popular';
  _apiBaseDetails = 'https://api.themoviedb.org/3/movie/';
  async getResource(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY1ODk5OTliZTZkMzYxNTIxYThmMjc1MzhkZTM2YiIsIm5iZiI6MTczODg3MDM0NS44NjUsInN1YiI6IjY3YTUwZTQ5ZWE0OWRlN2FjMDJmZTEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e5r8KTSzjM-DlpwUFYZLtBJJdTJgYLaEh6MHCqrS1dQ',
      },
    };
    const res = await fetch(
      `${this._apiBaseRated}?language=en-US&page=${page}`,
      options
    );

    return await res.json();
  }

  async getDetails(movieDbId) {
    if (!movieDbId) return;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY1ODk5OTliZTZkMzYxNTIxYThmMjc1MzhkZTM2YiIsIm5iZiI6MTczODg3MDM0NS44NjUsInN1YiI6IjY3YTUwZTQ5ZWE0OWRlN2FjMDJmZTEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e5r8KTSzjM-DlpwUFYZLtBJJdTJgYLaEh6MHCqrS1dQ',
      },
    };
    const res = await fetch(`${this._apiBaseDetails}${movieDbId}`, options);
    return await res.json();
  }
  
  
}
