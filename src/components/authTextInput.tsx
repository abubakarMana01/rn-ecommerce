import React, {ChangeEvent} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {colors} from '../constants';

interface AuthTextInputProps {
  placeholder: string;
  autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  label: string;
  value: string;
  setValue: (e: string | ChangeEvent<any>) => void;
  error: string | undefined;
}

export default function AuthTextInput({
  placeholder,
  keyboardType,
  autoCapitalize = 'sentences',
  autoCorrect = false,
  secureTextEntry = false,
  label,
  value,
  setValue,
  error,
}: AuthTextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.textInputContainer]}>
        <SimpleLineIcons name="lock" size={20} color={colors.dark} />
        <TextInput
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={setValue}
          style={styles.textInput}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  textInputContainer: {
    borderColor: colors.gray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 19,
    flex: 1,
    paddingLeft: 15,
  },
  label: {
    fontSize: 14,
  },
  error: {
    color: colors.red,
    marginTop: 3,
  },
});
