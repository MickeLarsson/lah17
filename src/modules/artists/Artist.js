import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TextHeadline, TextRegular, TextHuge } from '../components/Text';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

class Artist extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: 'crimson' }}>
        <Image source={{ uri: this.props.artist.image_medium.replace('http:', 'https:').replace('c_scale', 'c_thumb,g_faces,f_png') }} style={{ width, height, opacity: 0.75 }}>
          <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
            <View>
              <TextHuge style={styles.text}>{this.props.artist.name}</TextHuge>
              <TextHeadline style={styles.text}>{`${this.props.artist.city}, ${this.props.artist.country}`}</TextHeadline>
              <TextRegular style={styles.text}>{this.props.artist.category}</TextRegular>
              {this.props.artist.description.length > 0 && (
                <TextRegular style={styles.text}>{this.props.artist.description}</TextRegular>
              )}
            </View>
            <View style={{ marginTop: 16 }}>
              <TextHuge>När spelar dom?</TextHuge>
            </View>
          </ScrollView>
        </Image>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 16, alignItems: 'center', backgroundColor: 'transparent' }}>
          <TouchableOpacity onPress={() => alert('TODO: this should start the artists song')}>
            <Icon name="md-arrow-dropright-circle" color="white" size={60} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'crimson',
    marginTop: 8,
    padding: 4,
  },
});

const mapStateToProps = (state, props) => ({
  artist: props.artist,
});

export default connect(mapStateToProps)(Artist);
