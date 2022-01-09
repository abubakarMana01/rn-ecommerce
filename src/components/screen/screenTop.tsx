import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../../constants';

export default function ScreenTop({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
});
