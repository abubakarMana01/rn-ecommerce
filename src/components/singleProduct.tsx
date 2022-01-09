import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../constants';

export default function SingleProduct({product}: any) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() =>
        navigation.navigate('ProductDetails', {product, isLiked, setIsLiked})
      }>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.image}}
          resizeMode="contain"
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setIsLiked(!isLiked)}>
          <MaterialCommunityIcons
            name={isLiked ? 'heart' : 'heart-outline'}
            color={isLiked ? colors.red : colors.dark}
            size={27}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.price}>$ {product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 30,
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white,
    padding: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.white,
    elevation: 1,
  },
  details: {
    paddingVertical: 10,
  },
  title: {
    color: colors.dark,
    fontWeight: '600',
    fontSize: 16,
  },
  price: {
    color: colors.darkgray,
    fontSize: 14,
    fontWeight: '600',
  },
});
