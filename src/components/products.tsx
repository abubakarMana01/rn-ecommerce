import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Loader} from '.';
import {axios} from '../config';
import {useAuthContext} from '../contexts/authProvider';

import SingleProduct from './singleProduct';

interface ProductsProps {
  isLoading: boolean;
  setIsLoading: Function;
  fetchProducts: () => void;
  products: {}[];
  setProducts?: () => void;
}

export default function Products({isLoading, products}: ProductsProps) {
  const authContext = useAuthContext();
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    async function getLikedItems() {
      try {
        const res = await axios.post('/likedItems', {
          _id: authContext?.currentUser?.user._id,
        });
        setLikedProducts(res.data);
      } catch (err: any) {
        if (err.response) {
          Alert.alert('Error', err.response.data.error);
        }
        console.log(err.message);
      }
    }

    getLikedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={styles.flatList}
          columnWrapperStyle={styles.flatListColumnWrapperStyle}
          numColumns={2}
          data={products}
          renderItem={({item}) => (
            <SingleProduct likedProducts={likedProducts} product={item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listHeader: {
    marginBottom: 30,
  },
  flatList: {
    marginTop: 20,
  },
  flatListColumnWrapperStyle: {
    justifyContent: 'space-between',
  },
});
