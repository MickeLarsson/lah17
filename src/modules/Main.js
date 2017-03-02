import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getArtists } from '../modules/artists/actions';
import ArtistList from './artists/ArtistList';

const Main = ({ artists, fetchArtists }) => {
  if (artists.length === 0) {
    fetchArtists();
  }
  else {
    return <ArtistList />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'crimson', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading artists...</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  artists: state.artists.artists,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArtists: () =>
    dispatch(getArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
