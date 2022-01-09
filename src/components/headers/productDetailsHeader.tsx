import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../../constants';

interface ProductDetailsProps {
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
}

export default function ProductDetailsHeader({
  isLiked,
  setIsLiked,
}: ProductDetailsProps) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.dark}
          size={30}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setIsLiked(!isLiked)}>
        <MaterialCommunityIcons
          name={isLiked ? 'heart' : 'heart-outline'}
          color={isLiked ? colors.red : colors.dark}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backIcon: {
    backgroundColor: colors.lightGray,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.white,
    elevation: 1,
  },
});
