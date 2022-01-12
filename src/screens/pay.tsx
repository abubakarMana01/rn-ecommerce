import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Paystack} from 'react-native-paystack-webview';

import {useAppContext} from '../contexts';

export default function Pay({route}: {route: any}) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const appContext = useAppContext();

  const {amount, products} = route.params;
  console.log(products);

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
        onSuccess={(res: {}) => {
          console.log(res);
          appContext?.setCart([]);
          navigation.navigate('Home');
        }}
        autoStart={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
