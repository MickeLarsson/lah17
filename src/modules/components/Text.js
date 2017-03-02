import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const TextHeadline = ({ style, children }) =>
  <Text style={[styles.base, styles.headline, style]}>{children}</Text>;

export const TextHuge = ({ style, children }) =>
  <Text style={[styles.base, styles.huge, style]}>{children}</Text>;

export const TextRegular = ({ style, children }) =>
  <Text style={[styles.base, styles.regular, style]}>{children}</Text>;

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Avenir-Book',
    color: '#333',
  },
  headline: {
    fontSize: 24,
  },
  huge: {
    fontSize: 32,
  },
  regular: {
    fontSize: 14,
  },
});

export default {
  headline: TextHeadline,
  huge: TextHuge,
  regular: TextRegular,
};
