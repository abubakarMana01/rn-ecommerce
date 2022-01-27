import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {axios} from '../config';
import {colors} from '../constants';
import {useAuthContext} from '../contexts/authProvider';

export default function SingleProduct({
  product,
  likedProducts,
  setLikedProducts,
  color,
}: any) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const authContext = useAuthContext();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = likedProducts.find((item: any) => {
      return item === product.id;
    });

    if (checkIfLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLike() {
    if (isLiked) {
      try {
        setIsLiked(false);
        const res = await axios.put('/likedItems/removeFromLikes', {
          _id: authContext?.currentUser?.user._id,
          productId: product.id,
        });

        ToastAndroid.show('Removed from likes', ToastAndroid.SHORT);
        setLikedProducts(res.data.user.likedProducts);
        return;
      } catch (err: any) {
        setIsLiked(true);
        console.log(err.response);
      }
    }

    try {
      setIsLiked(true);

      const res = await axios.put('/likedItems/addToLikes', {
        _id: authContext?.currentUser?.user._id,
        productId: product.id,
      });

      ToastAndroid.show('Added to likes', ToastAndroid.SHORT);
      setLikedProducts(res.data.user.likedProducts);
    } catch (err: any) {
      setIsLiked(false);

      if (err.response.data.error) {
        ToastAndroid.show('Product already in likes', ToastAndroid.SHORT);
      }
      console.log(err.message);
    }
  }

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
        <TouchableOpacity style={styles.iconContainer} onPress={handleLike}>
          <MaterialCommunityIcons
            name={isLiked ? 'heart' : 'heart-outline'}
            color={isLiked ? colors.red : colors.dark}
            size={27}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>
          {color} {product.title}
        </Text>
        <Text style={styles.price}>₦{(product.price * 413).toFixed(2)}</Text>
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
