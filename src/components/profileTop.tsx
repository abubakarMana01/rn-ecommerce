import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../constants';
import {useAuthContext} from '../contexts/authProvider';

export default function ProfileTop() {
  const authContext = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Ionicons name="person" size={60} color={colors.gray} />
      </View>
      <Text style={styles.username}>{authContext?.currentUser?.username}</Text>
      <Text style={styles.email}>{authContext?.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          color={colors.white}
          size={27}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  username: {
    fontSize: 26,
    color: colors.dark,
    fontWeight: '600',
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    marginTop: 15,
    width: 160,
    height: 45,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingLeft: 20,
    paddingRight: 13,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 18,
  },
});
