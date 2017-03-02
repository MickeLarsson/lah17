import React from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ArtistListRow from './ArtistListRow';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ArtistList extends React.Component {
  render() {
    const sortedArtists = _.sortBy(this.props.artists, a => a.name);
    const data = ds.cloneWithRows(sortedArtists);
    return (
      <View style={{ flex: 1, backgroundColor: '#f1f1f1', paddingTop: 20 }}>
        <ListView
          dataSource={data}
          renderRow={(artist, id) => <ArtistListRow key={id} artist={artist} />}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  artists: state.artists.artists,
});

export default connect(mapStateToProps)(ArtistList);
