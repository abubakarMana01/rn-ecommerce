import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Dimensions, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../constants';
import {Home, Likes, Profile} from '../screens';
import {BottomTabsScreen, Loader} from '../components';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Dimensions.get('window').height * 0.2,
          maxHeight: 120,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.lightGray,
      }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon focused={focused}>
              <AntDesign
                style={styles.icon}
                name="home"
                size={size}
                color={color}
              />
            </Icon>
          ),
        }}
      />
      <Tab.Screen
        component={Test}
        name="Explore"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon focused={focused}>
              <AntDesign
                style={styles.icon}
                name="appstore-o"
                size={size}
                color={color}
              />
            </Icon>
          ),
        }}
      />
      {/* <Tab.Screen
        component={Likes}
        name="Likes"
        options={{
          headerShown: true,
          headerTitle: 'Saved items',
          tabBarIcon: ({focused, color, size}) => (
            <Icon focused={focused}>
              <AntDesign
                style={styles.icon}
                name="hearto"
                size={size}
                color={color}
              />
            </Icon>
          ),
        }}
      /> */}
      <Tab.Screen
        component={Profile}
        name="Profile"
        options={({navigation}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {elevation: 0, backgroundColor: colors.backgroundLight},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.icon}>
              <MaterialCommunityIcons
                name="chevron-left"
                color={colors.dark}
                size={35}
              />
            </TouchableOpacity>
          ),
          tabBarStyle: {height: 0},
          tabBarIcon: ({focused, color, size}) => (
            <Icon focused={focused}>
              <FontAwesome
                style={styles.icon}
                name="user-o"
                size={size}
                color={color}
              />
            </Icon>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

function Icon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View
      style={[
        styles.iconContainer,
        {
          backgroundColor: focused ? colors.brown : colors.primary,
        },
      ]}>
      {children}
    </View>
  );
}

function Test() {
  return (
    <BottomTabsScreen>
      <Loader />
    </BottomTabsScreen>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  icon: {
    padding: 10,
  },
});
