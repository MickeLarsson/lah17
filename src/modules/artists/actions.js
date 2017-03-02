import { get } from '../../fetch';

const types = {
  GET_ARTISTS: 'GET_ARTISTS',
};

const getArtists = () =>
  get(types.GET_ARTISTS, (config) => `${config.apiUrl}/api/artists`);

export {
  getArtists,
  types,
};
