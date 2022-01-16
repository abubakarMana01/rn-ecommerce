/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Button,
  ProductDetailsHeader,
  ScreenBottom,
  ScreenTop,
} from '../components';
import {colors} from '../constants';
import {axios} from '../config';
import {useAuthContext} from '../contexts/authProvider';

interface RouteParamsType {
  image: string;
  price: string;
  isLiked: boolean;
  setIsLiked: () => void;
}

export default function ProductDetails() {
  const authContext = useAuthContext();
  const sheetRef = useRef<any>(null);
  const fall = new Animated.Value(1);

  const route = useRoute<RouteProp<ParamListBase, string>>();
  const {product, isLiked, setIsLiked}: any | RouteParamsType = route.params;

  const handleAddToCart = async () => {
    try {
      await axios.put('/cart', {
        _id: authContext?.currentUser?.user._id,
        product,
      });
      ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
    } catch (err: any) {
      if (err.response.data.error) {
        console.log(err.response.data.error);
        err.response.data.error === 'Product already in cart'
          ? ToastAndroid.show('Item already in cart', ToastAndroid.SHORT)
          : ToastAndroid.show('Failed to add to cart!', ToastAndroid.SHORT);
      }
      console.log(err.message);
    }
  };

  const renderSheetHeader = () => (
    <View style={styles.sheetHeader}>
      <View style={styles.sheetPanelHeader}>
        <View style={styles.sheetPanelHandle} />
      </View>
    </View>
  );

  const renderSheetContent = () => (
    <View style={styles.sheetWrapper}>
      <Text style={styles.sheetProductCategory}>{product.category}</Text>
      <Text style={styles.sheetProductTitle}>{product.title}</Text>
      <Text style={styles.sheetProductDescription}>{product.description}</Text>

      <View style={styles.sheetRatingContainer}>
        <MaterialCommunityIcons name="star" color={colors.brown} size={35} />
        <Text style={styles.sheetRating}>
          {product.rating.rate}
          <Text style={styles.sheetRatingCount}>({product.rating.count})</Text>
        </Text>
      </View>
    </View>
  );
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => sheetRef?.current?.snapTo(1)}>
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

          <TouchableOpacity
            style={styles.viewDetailsContainer}
            onPress={() => sheetRef?.current?.snapTo(0)}>
            <MaterialCommunityIcons name="chevron-double-up" size={24} />
            <Text style={styles.viewDetailsText}>Tap to see details</Text>
          </TouchableOpacity>
        </ScreenTop>
      </TouchableOpacity>

      <ScreenBottom>
        <View style={styles.priceContainer}>
          <Text style={styles.subTotal}>Sub total</Text>
          <Text style={styles.price}>₦{(product.price * 413).toFixed(2)}</Text>
        </View>
        <Button title="Add to cart" onPress={() => handleAddToCart()} />
      </ScreenBottom>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 0]}
        initialSnap={1}
        renderHeader={renderSheetHeader}
        renderContent={renderSheetContent}
        callbackNode={fall}
      />
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
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '70%',
    width: '90%',
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

  viewDetailsContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  viewDetailsText: {
    fontSize: 16,
    color: colors.darkgray,
  },

  sheetWrapper: {
    backgroundColor: colors.primary,
    height: 600,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  sheetHeader: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
  },
  sheetPanelHeader: {
    alignItems: 'center',
  },
  sheetPanelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
  },
  sheetProductCategory: {
    marginBottom: 5,
    fontSize: 16,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  sheetProductTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  sheetProductDescription: {
    color: colors.lightGray,
    fontSize: 16,
    marginTop: 10,
  },
  sheetRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sheetRating: {
    color: colors.white,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '600',
  },
  sheetRatingCount: {
    color: colors.gray,
    fontSize: 14,
  },
});
