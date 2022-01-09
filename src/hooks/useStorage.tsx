import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage() {
  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem('jwtToken', value);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('jwtToken');
      if (value !== null) {
        return value;
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const removeToken = () => {
    AsyncStorage.removeItem('jwtToken');
  };
  return {storeToken, getToken, removeToken};
}
