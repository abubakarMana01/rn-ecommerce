import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Paystack} from 'react-native-paystack-webview';

import {useAppContext} from '../contexts';
import {axios} from '../config';
import {useAuthContext} from '../contexts/authProvider';

export default function Pay({route}: {route: any}) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const appContext = useAppContext();
  const authContext = useAuthContext();

  const {amount, products} = route.params;

  async function handleSuccess(res: {}) {
    console.log(res);
    appContext?.setCart([]);
    navigation.navigate('Home');
    console.log(products);

    try {
      await axios.delete('/cart/' + authContext?.currentUser?.user._id);
      // products.forEach(async (product: {}) => {
      //   console.log(product);
      //   await axios.put('/orders/' + authContext?.currentUser?.user._id, {
      //     product,
      //   });
      // });

      for (let i = 0; i < products.length; i++) {
        await axios.put('/orders/' + authContext?.currentUser?.user._id, {
          product: products[i],
        });
      }
    } catch (err: any) {
      console.log(err.response.data);
      console.log(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Paystack
        paystackKey="pk_test_f828309267cfae96d727995b9249cbbb147c13c6"
        amount={amount}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={(e: {}) => {
          console.log(e);
          navigation.goBack();
        }}
        onSuccess={handleSuccess}
        autoStart={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
