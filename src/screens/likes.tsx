import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {Button, Products, RegularScreen} from '../components';
import {useAuthContext} from '../contexts/authProvider';
import {axios} from '../config';
import {colors} from '../constants';

export default function Likes() {
  const authContext = useAuthContext();
  const [likedProducts, setLikedProducts] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  async function fetchLikes() {
    try {
      setFetchError(false);
      setIsLoading(true);
      const res = await axios.post('/likedItems/', {
        _id: authContext?.currentUser?.user._id,
      });
      setIsLoading(true);

      setIsLoading(true);
      const productsResponse = await axios.get(
        'https://fakestoreapi.com/products',
      );
      const data = await productsResponse.data;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < res.data.length; j++) {
          if (res.data[j] === data[i].id) {
            // console.log(likedProducts, data[i].id);

            // if (likedProducts.includes(data[i].id)) return;

            setLikedProducts((prev: {}[]) => {
              // console.log(prev);
              // if (prev.includes(data[i])) {
              //   return;
              // }
              return [...prev, data[i]];
            });
          }
        }
        setIsLoading(false);
      }
    } catch (err: any) {
      setFetchError(true);
      setIsLoading(false);
      if (err.response) {
        Alert.alert('Error', err.response.data.error);
      }
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchLikes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegularScreen>
      {fetchError ? (
        <View style={styles.errorContainer}>
          <LottieView
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
        <Products
          products={likedProducts}
          isLoading={isLoading}
          // onRefresh={fetchLikes}
        />
      )}
    </RegularScreen>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
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

// useEffect(() => {
//   (async function () {
//     try {
//       setFetchError(false);
//       setIsLoading(true);
//       const res = await axios.post('/likedItems/', {
//         _id: authContext?.currentUser?.user._id,
//       });
//       setLikedProductsIds(res.data);
//       setIsLoading(true);
//     } catch (err: any) {
//       setFetchError(true);
//       if (err.response) {
//         Alert.alert('Error', err.response.data.error);
//       }
//       console.log(err.message);
//     }
//   })();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// useEffect(() => {
//   (async function fetchProducts() {
//     try {
//       setFetchError(false);
//       setIsLoading(true);
//       const res = await axios.get('https://fakestoreapi.com/products');
//       const data = await res.data;

//       for (let i = 0; i < data.length; i++) {
//         for (let j = 0; j < likedProductsIds.length; j++) {
//           if (likedProductsIds[j] === data[i].id) {
//             // setLikedProducts((prev: [id: string]) => [data[i]]);
//             setLikedProducts((prev: [id: string]) => [...prev, data[i]]);
//           }
//         }
//         setIsLoading(false);
//       }
//     } catch (err: any) {
//       setIsLoading(false);
//       setFetchError(true);
//       console.log(err.response);
//       console.log(err.message);
//     }
//   })();
// }, [likedProductsIds]);
