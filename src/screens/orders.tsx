import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {Button, Products, RegularScreen} from '../components';
import {useAuthContext} from '../contexts/authProvider';
import {axios} from '../config';
import {colors} from '../constants';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export default function Orders() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const authContext = useAuthContext();

  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<{}[]>([]);

  async function fetchOrders() {
    try {
      setFetchError(false);
      setIsLoading(true);

      const res = await axios.get(
        '/orders/' + authContext?.currentUser?.user._id,
      );
      setIsLoading(false);
      setOrders(res.data);
    } catch (err: any) {
      setFetchError(true);
      setIsLoading(false);
      console.log(err.response.data.error);
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegularScreen>
      {fetchError ? (
        <View style={styles.errorContainer}>
          <LottieView
            source={require('../assets/animations/scanner.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          <Text style={styles.error}>
            Failed to fetch items. Check your internet connection
          </Text>
          <Button title="Refresh" onPress={fetchOrders} />
        </View>
      ) : !orders.length && !isLoading ? (
        <View style={styles.noOrdersContainer}>
          <LottieView
            source={require('../assets/animations/no-item-cart.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          <Text style={styles.error}>You have not made any orders</Text>
          <Button
            title="Continue shopping"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ) : (
        <Products
          isLoading={isLoading}
          onRefresh={fetchOrders}
          products={orders}
        />
      )}
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  lottie: {
    width: 170,
    height: 170,
  },

  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    top: -50,
  },
});
