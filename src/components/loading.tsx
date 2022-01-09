import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/loader.json')}
        autoPlay
        style={styles.lottie}
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
