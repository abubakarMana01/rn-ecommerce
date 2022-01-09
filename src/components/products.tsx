import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Loader} from '.';

import SingleProduct from './singleProduct';

interface ProductsProps {
  isLoading: boolean;
  setIsLoading: Function;
  fetchProducts: () => void;
  products: {}[];
  setProducts?: () => void;
}

export default function Products({isLoading, products}: ProductsProps) {
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
          renderItem={({item}) => <SingleProduct product={item} />}
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
