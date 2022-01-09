import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from '../../constants';
import {useAppContext} from '../../contexts';

export default function CartHeader() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {cart}: any = useAppContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <AntDesign name="arrowleft" color={colors.dark} size={24} />
      </TouchableOpacity>

      <View>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.numberOfItems}>{cart.length} Items</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  numberOfItems: {
    fontSize: 18,
    color: colors.darkgray,
    textAlign: 'center',
  },
});
