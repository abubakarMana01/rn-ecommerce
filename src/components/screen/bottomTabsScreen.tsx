import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../../constants';

export default function Screen({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
});
