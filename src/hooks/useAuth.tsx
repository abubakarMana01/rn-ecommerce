import {Alert} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useAuthContext} from '../contexts/authProvider';

import {axios} from '../config';
import jwtDecode from 'jwt-decode';
import useStorage from './useStorage';

export default function useAuth() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const authContext = useAuthContext();
  const {storeToken, removeToken} = useStorage();

  async function signup(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    setIsLoading: Function,
  ) {
    if (password !== confirmPassword) {
      return Alert.alert('Error', "Passwords don't match");
    }

    try {
      setIsLoading(true);
      await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      setIsLoading(false);
      navigation.navigate('Login');
    } catch (err: any) {
      setIsLoading(false);
      if (err.response) {
        Alert.alert('Error', err.response.data.error);
      }
    }
  }

  async function login(
    email: string,
    password: string,
    setIsLoading: Function,
  ) {
    try {
      setIsLoading(true);
      const res = await axios.post('/auth/login', {
        email,
        password,
      });
      setIsLoading(false);
      await storeToken(res.data.token);
      const decode: any = jwtDecode(res.data.token);
      authContext?.setCurrentUser(decode.user);
    } catch (err: any) {
      setIsLoading(false);
      if (err.response) {
        Alert.alert('Error', err.response.data.error);
      }
    }
  }

  function logout() {
    authContext?.setCurrentUser(null);
    removeToken();
  }
  return {signup, login, logout};
}
