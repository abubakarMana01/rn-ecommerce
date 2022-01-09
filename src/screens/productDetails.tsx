import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Button,
  ProductDetailsHeader,
  ScreenBottom,
  ScreenTop,
} from '../components';
import {colors} from '../constants';
import {useAppContext} from '../contexts';

interface RouteParamsType {
  image: string;
  price: string;
  isLiked: boolean;
  setIsLiked: () => void;
}

export default function ProductDetails() {
  const {cart, setCart}: any = useAppContext();

  const route = useRoute<RouteProp<ParamListBase, string>>();
  const {product, isLiked, setIsLiked}: any | RouteParamsType = route.params;

  const handleAddToCart = () => {
    try {
      const itemExists = cart.find((item: any) => item.id === product.id);

      if (itemExists) {
        return ToastAndroid.show(
          'Product already in cart!',
          ToastAndroid.SHORT,
        );
      }

      setCart((currentCart: []) => [...currentCart, {...product}]);
      ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      <ScreenTop>
        <ProductDetailsHeader isLiked={isLiked} setIsLiked={setIsLiked} />

        <View style={styles.selectionContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{uri: product.image}}
                style={styles.imageSelect}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{uri: product.image}}
                style={styles.imageSelect}
              />
            </View>
            <View
              style={[
                styles.imageContainer,
                // eslint-disable-next-line react-native/no-inline-styles
                {borderColor: colors.brown, borderWidth: 1},
              ]}>
              <Image
                resizeMode="contain"
                source={{uri: product.image}}
                style={styles.imageSelect}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{uri: product.image}}
                style={styles.imageSelect}
              />
            </View>
          </ScrollView>
          <MaterialCommunityIcons
            style={styles.selectScrollIcon}
            name="chevron-up"
            size={30}
            color={colors.darkgray}
          />
        </View>

        <Image
          resizeMode="contain"
          source={{uri: product.image}}
          style={styles.image}
        />
      </ScreenTop>
      <ScreenBottom>
        <View style={styles.priceContainer}>
          <Text style={styles.subTotal}>Sub total</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Button title="Add to cart" onPress={() => handleAddToCart()} />
      </ScreenBottom>
    </>
  );
}

const styles = StyleSheet.create({
  priceContainer: {},
  subTotal: {
    color: colors.gray,
    fontSize: 16,
  },
  price: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
  },
  selectionContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -150}],
    right: 15,
    height: 300,
    borderRadius: 20,
    width: 70,
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderWidth: 1,
    zIndex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    width: 55,
    height: 55,
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: 10,
  },
  imageSelect: {
    width: '100%',
    height: '100%',
  },
  selectScrollIcon: {
    marginTop: 10,
  },
});
