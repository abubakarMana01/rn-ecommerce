import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import navigationTheme from './navigationTheme';
import AuthStackNavigator from './authStackNavigator';
import StackNavigator from './stackNavigator';
import {useAuthContext} from '../contexts/authProvider';
import {Loader} from '../components';
import jwtDecode from 'jwt-decode';
import {useStorage} from '../hooks';

export default function Navigator() {
  const authContext = useAuthContext();

  const {getToken} = useStorage();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getToken()
      .then(token => {
        if (token) {
          authContext?.setCurrentUser(jwtDecode(token));
          setIsReady(true);
        } else {
          setIsReady(true);
        }
      })
      .catch(err => {
        console.log(err.message);
        setIsReady(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return <Loader />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {authContext?.currentUser ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
