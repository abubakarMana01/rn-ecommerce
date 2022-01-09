import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {colors} from '../../constants';

export default function ScreenBottom({children}: {children: React.ReactNode}) {
  return <View style={styles.bottom}>{children}</View>;
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: colors.primary,
    height: Dimensions.get('window').height * 0.2,
    maxHeight: 120,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
