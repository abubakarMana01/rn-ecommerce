import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Cart, Pay, ProductDetails} from '../screens';
import BottomTabs from './bottomTabs';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen
        name="ProductDetails"
        options={{presentation: 'modal'}}
        component={ProductDetails}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Pay" component={Pay} />
    </Stack.Navigator>
  );
}
