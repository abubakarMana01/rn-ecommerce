import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {axios} from '../../config';

import {colors} from '../../constants';
import {useAppContext} from '../../contexts';
import {useAuthContext} from '../../contexts/authProvider';

export default function HomeHeader() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {cart, setCart, setCartTotal}: any = useAppContext();
  const authContext = useAuthContext();

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.post('/cart', {
          _id: authContext?.currentUser?.user._id,
        });
        const data = res.data;
        setCart(data);

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i].price;
        }
        setCartTotal(sum);
      } catch (err: any) {
        console.log(err.message);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <AntDesign name="slack-square" size={35} color={colors.brown} />
        {/* <Text style={styles.username}>
          Welcome {authContext?.currentUser?.username}!
        </Text> */}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <AntDesign name="search1" size={27} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.numberOfCartItems}>
            <Text style={styles.number}>{cart.length}</Text>
          </View>
          <AntDesign name="shoppingcart" size={27} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  headerLeft: {},
  // username: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   color: colors.brown,
  // },
  headerRight: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  numberOfCartItems: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.brown,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
