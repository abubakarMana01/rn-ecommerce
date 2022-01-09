import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Login, Signup} from '../screens';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, presentation: 'modal'}}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}
