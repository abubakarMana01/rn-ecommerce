/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {CartHeader, CartItem, Screen, Button} from '../components';
import {colors} from '../constants';
import {useAppContext} from '../contexts';

export default function Cart() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const {cart, cartTotal, setCartTotal}: any = useAppContext();
  const shippingFee = cart.length === 0 ? 0 : 5;

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price;
    }
    setCartTotal(sum.toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const total = (+cartTotal + +shippingFee).toFixed(2);

  const swipeFromLeftOpen = () => {
    navigation.navigate('Pay', {
      amount: total,
    });
  };

  return (
    <Screen>
      <CartHeader />

      <View style={styles.main}>
        {cart.length === 0 ? (
          <View style={styles.noItemContainer}>
            <LottieView
              source={require('../assets/animations/no-item-cart.json')}
              autoPlay
              loop
              style={{height: 200, width: 200}}
            />
            <Text style={styles.noItem}>Your cart is empty</Text>
            <View style={styles.notItemsButtonContainer}>
              <Button
                title="Continue Shopping"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          </View>
        ) : (
          <FlatList
            data={cart}
            renderItem={({item}: any) => <CartItem product={item} />}
          />
        )}

        {cart.length ? (
          <View style={styles.checkoutContainer}>
            <View style={styles.checkoutPricesContainer}>
              <Text style={styles.title}>Sub total:</Text>
              <Text style={styles.price}>${cartTotal}</Text>
            </View>
            <View style={styles.checkoutPricesContainer}>
              <Text style={styles.title}>Shipping:</Text>
              <Text style={styles.price}>${shippingFee.toFixed(2)}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.checkoutPricesContainer}>
              <Text style={styles.title}>Bag total:</Text>
              <Text style={[styles.price, {color: colors.brown}]}>
                ${total}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Swipeable
                enabled={+total > 0}
                leftThreshold={150}
                renderLeftActions={LeftSwipeActions}
                onSwipeableLeftOpen={swipeFromLeftOpen}>
                <View style={[styles.button, {opacity: +total <= 0 ? 0.5 : 1}]}>
                  <Text style={styles.buttonTitle}>Swipe to checkout</Text>
                  <AntDesign
                    name="doubleright"
                    size={27}
                    color={colors.white}
                  />
                </View>
              </Swipeable>
            </View>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const LeftSwipeActions = () => {
  return (
    <View style={[styles.button, styles.leftSwipeButton]}>
      <Text style={styles.leftSwipeButtonTitle}>Pay</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingLeft: 15,
    paddingRight: 3,
    flex: 1,
  },
  noItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: -50,
  },
  noItem: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '600',
  },
  notItemsButtonContainer: {
    marginTop: 10,
  },
  checkoutContainer: {
    padding: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
  },
  checkoutPricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    color: colors.darkgray,
  },
  price: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: 30,
  },
  separator: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.gray,
    marginVertical: 10,
  },

  button: {
    backgroundColor: colors.brown,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  buttonTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 20,
  },
  leftSwipeButton: {
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSwipeButtonTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
