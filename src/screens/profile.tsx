import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {ProfileBottom, ProfileTop} from '../components';
import {colors} from '../constants';

export default function profile() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileTop />
        <ProfileBottom />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: colors.backgroundLight, flex: 1},
});
