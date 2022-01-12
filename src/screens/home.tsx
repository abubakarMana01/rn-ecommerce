import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  BottomTabsScreen,
  Button,
  Categories,
  HomeHeader,
  Products,
} from '../components';
import {colors} from '../constants';

export default function Home() {
  const [products, setProducts] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  async function fetchProducts() {
    try {
      setFetchError(false);
      setIsLoading(true);
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setFetchError(true);
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
        contentContainerStyle={styles.scrollView}
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

        {fetchError ? (
          <View style={styles.errorContainer}>
            <AnimatedLottieView
              source={require('../assets/animations/scanner.json')}
              autoPlay
              style={styles.lottie}
              loop
            />
            <Text style={styles.error}>
              Failed to fetch items. Check your internet connection
            </Text>
            <Button title="Refresh" onPress={() => console.log('Refresh')} />
          </View>
        ) : (
          <Products products={products} isLoading={isLoading} />
        )}
      </ScrollView>
    </BottomTabsScreen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
  errorContainer: {
    top: -50,
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
    width: 100,
    height: 100,
  },
});
