import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import {colors} from '../constants';

export default function NoInternet() {
  const {isInternetReachable} = useNetInfo();

  if (isInternetReachable) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    padding: 5,
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
