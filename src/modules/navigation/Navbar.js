import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TextRunning } from '../../components/Text';
import Colors from '../../config/Colors';
import { openDrawer, closeDrawer } from '../drawer/actions';

const Navbar = ({ title, openMenu, backgroundColor = null }) =>
  <View style={[styles.wrapper, backgroundColor && { backgroundColor }]}>
    <TouchableOpacity onPress={() => openMenu()}>
      <TextRunning style={{ color: 'white' }}>Menu</TextRunning>
    </TouchableOpacity>
    <TextRunning style={styles.text}>{title}</TextRunning>
  </View>;

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.midnight,
  },
  text: {
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  menuIsOpen: state.drawer.drawerState === 'open',
});

const mapDispatchToProps = (dispatch) => ({
  openMenu: () =>
    dispatch(openDrawer()),
  closeMenu: () =>
    dispatch(closeDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
