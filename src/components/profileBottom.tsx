import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {colors} from '../constants';
import {useAuth} from '../hooks';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export default function ProfileBottom() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <View style={styles.iconLeftContainer}>
          <AntDesign name="setting" size={24} color={colors.primary} />
        </View>
        <Text style={styles.itemTitle}>Settings</Text>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconLeftContainer}>
          <Ionicons name="card" size={24} color={colors.primary} />
        </View>
        <Text style={styles.itemTitle}>Billing details</Text>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Likes')}>
        <View style={styles.iconLeftContainer}>
          <FontAwesome name="heart" size={24} color={colors.primary} />
        </View>
        <Text style={styles.itemTitle}>Saved items</Text>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconLeftContainer}>
          <AntDesign name="infocirlce" size={24} color={colors.primary} />
        </View>
        <Text style={styles.itemTitle}>Information</Text>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={logout}>
        <View style={styles.iconLeftContainer}>
          <FontAwesome name="arrow-right" size={24} color={colors.primary} />
        </View>
        <Text style={styles.itemTitle}>Logout</Text>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  itemTitle: {
    fontSize: 18,
    color: colors.dark,
    flex: 1,
    marginHorizontal: 20,
    fontWeight: '600',
  },
  iconLeftContainer: {
    height: 65,
    width: 65,
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: 30,
    marginVertical: 20,
  },
});
