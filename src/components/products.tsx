import React, {useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Loader} from '.';
import {axios} from '../config';
import {colors} from '../constants';
import {useAuthContext} from '../contexts/authProvider';

import SingleProduct from './singleProduct';

interface ProductsProps {
  isLoading?: boolean;
  products: {}[];
  onRefresh?: () => void;
}

export default function Products({
  isLoading = false,
  products,
  onRefresh = () => {},
}: ProductsProps) {
  const authContext = useAuthContext();
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.post('/likedItems/', {
          _id: authContext?.currentUser?.user._id,
        });
        setLikedProducts(res.data);
      } catch (err: any) {
        if (err.response) {
          Alert.alert('Error', err.response.data.error);
        }
        console.log(err.message);
      }
    })();

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
          refreshControl={
            <RefreshControl
              colors={[colors.brown]}
              onRefresh={onRefresh}
              refreshing={false}
            />
          }
          renderItem={({item}) => (
            <SingleProduct
              likedProducts={likedProducts}
              setLikedProducts={setLikedProducts}
              product={item}
            />
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
