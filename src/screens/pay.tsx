import React from 'react';
import {View} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Paystack} from 'react-native-paystack-webview';

export default function Pay({route}: {route: any}) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={{flex: 1}}>
      <Paystack
        paystackKey="pk_test_f828309267cfae96d727995b9249cbbb147c13c6"
        amount={route.params.amount}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={e => {
          // handle response here
          console.log(e);
          navigation.goBack();
        }}
        onSuccess={res => {
          // handle response here
          console.log(res);
          navigation.navigate('Home');
        }}
        autoStart={true}
      />
    </View>
  );
}
