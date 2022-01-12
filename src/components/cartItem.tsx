import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import {axios} from '../config';

import {colors} from '../constants';
import {useAppContext} from '../contexts';
import {useAuthContext} from '../contexts/authProvider';

export interface CartItemProps {
  product: {
    id: string;
    image: string;
    price: string;
    title: string;
  };
}

export default function CartItem({product}: CartItemProps) {
  const authContext = useAuthContext();
  const {setCart, setCartTotal}: any = useAppContext();

  const handleDelete = async (id: string) => {
    try {
      // setCart((prev: []) =>
      //   prev.filter((item: {id: string}) => item.id !== id),
      // );
      const res = await axios.delete(
        '/cart/' + authContext?.currentUser?.user._id + '/' + id,
      );

      setCart(res.data);
      setCartTotal((prev: number) => prev - Number(product.price));
    } catch (err: any) {
      // setCart((prev: []) => [...prev, product]);
      console.log(err.response.data);
      console.log(err.message);
    }
  };

  const price = (+product.price * 413).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: product.image}}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
          <Text style={styles.size}>L</Text>
        </View>

        <Text style={styles.price}>₦{price}</Text>

        <View style={styles.bottom}>
          <View style={styles.quantitySelectorContainer}>
            <TouchableOpacity style={styles.selectQuantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>1</Text>
            <TouchableOpacity style={styles.selectQuantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => handleDelete(product.id)}>
            <MaterialCommunityIcons
              name="trash-outline"
              color={colors.red}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 100,
    width: 100,
    backgroundColor: colors.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  details: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
  },
  size: {
    fontSize: 16,
    color: colors.gray,
    right: 7,
    marginLeft: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  bottom: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantitySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-between',
  },
  selectQuantityButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  quantityButtonText: {
    fontSize: 18,
  },
});
