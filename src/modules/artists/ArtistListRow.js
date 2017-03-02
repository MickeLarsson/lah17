import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { TextHeadline, TextRegular } from '../components/Text';
import { open } from '../navigation/actions';

class ArtistListRow extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.openArtist(this.props.artist)}>
        <View style={styles.rowWrapper}>
          <View style={styles.rowHolder}>
            {this.props.artist.image_small && (
              <View>
                <Image source={{ uri: this.props.artist.image_small.replace('http:', 'https:').replace('c_scale', 'c_thumb,g_faces,f_png') }} style={{ backgroundColor: '#ddd', width: 60, height: 60 }} />
              </View>
            )}
            <View style={{ flex: 1, marginLeft: 8 }}>
              <TextHeadline>{this.props.artist.name}</TextHeadline>
              <TextRegular>{this.props.artist.category}</TextRegular>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowWrapper: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const mapStateToProps = (_state, props) => ({
  artist: props.artist,
});

const mapDispatchToProps = (dispatch) => ({
  openArtist: (artist) =>
    dispatch(open('Artist', { artist })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListRow);
