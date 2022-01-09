import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  BottomTabsScreen,
  Categories,
  HomeHeader,
  Products,
} from '../components';
import {colors} from '../constants';

export default function Home() {
  const [products, setProducts] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <BottomTabsScreen>
      <HomeHeader />

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[colors.brown]}
            refreshing={false}
            onRefresh={fetchProducts}
          />
        }>
        <View style={styles.promoContainer}>
          <Text style={styles.promoTop}>Find your</Text>
          <Text style={styles.promoBottom}>match style!</Text>
        </View>

        <Categories />

        <Products
          products={products}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fetchProducts={fetchProducts}
        />
      </ScrollView>
    </BottomTabsScreen>
  );
}

const styles = StyleSheet.create({
  promoContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  promoTop: {
    fontSize: 32,
    color: colors.dark,
    fontWeight: '700',
  },
  promoBottom: {
    fontSize: 32,
    color: colors.darkgray,
  },
  scrollView: {height: '100%'},
});
