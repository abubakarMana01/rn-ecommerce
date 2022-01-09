import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View, LogBox} from 'react-native';

import {AppProvider, AuthProvider} from './src/contexts';
import {colors} from './src/constants';

import Navigator from './src/navs';
import {NoInternet} from './src/components';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />
          <NoInternet />

          <Navigator />
        </View>
      </AppProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
