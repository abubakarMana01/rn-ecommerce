import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {colors} from '../constants';

export default function Categories() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.listHeaderComponent} />
        <Category title="Trending now" isActive />
        <Category title="2022 New in" />
        <Category title="Tiktok" />
        <Category title="Trending now" />
        <Category title="Trending now" />
      </ScrollView>
    </View>
  );
}

function Category({
  title,
  isActive = false,
}: {
  title: string;
  isActive?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        {backgroundColor: isActive ? colors.primary : colors.white},
      ]}>
      <Text
        style={[
          styles.categoryTitle,
          {
            color: isActive ? colors.white : colors.darkgray,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  listHeaderComponent: {
    marginLeft: 15,
  },

  categoryContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginRight: 7,
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    color: colors.white,
    fontWeight: '600',
  },
});
