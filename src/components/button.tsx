import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../constants';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  full?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  title,
  onPress,
  full = false,
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.button,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: full ? '100%' : 170,
            height: full ? 60 : 50,
            opacity: disabled ? 0.5 : 1,
          },
        ]}>
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonTitle}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brown,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
