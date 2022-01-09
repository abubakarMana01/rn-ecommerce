import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {AuthTextInput, Button} from '../../components';
import {colors} from '../../constants';
import {useAuth} from '../../hooks';

export default function SignUp() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {signup} = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const signUpSchema = Yup.object({
    username: Yup.string().required().min(3).max(255).trim().label('Username'),
    email: Yup.string().required().min(3).email().trim().label('Email'),
    password: Yup.string().required().min(6).max(255).label('Password'),
    confirmPassword: Yup.string()
      .required()
      .min(6)
      .max(255)
      .label('Confirm password'),
  });

  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.headerTitle}>Create account</Text>
          </View>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async values => {
              await signup(
                values.username,
                values.email,
                values.password,
                values.confirmPassword,
                setIsLoading,
              );
            }}
            validationSchema={signUpSchema}>
            {({handleSubmit, handleChange, values, errors}) => (
              <View style={styles.mainContent}>
                <AuthTextInput
                  label="Username"
                  placeholder="E.g, johndoe"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.username}
                  value={values.username}
                  setValue={handleChange('username')}
                />
                <AuthTextInput
                  label="Email"
                  placeholder="E.g, someone@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                  value={values.email}
                  setValue={handleChange('email')}
                />
                <AuthTextInput
                  label="Password"
                  placeholder="********"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  error={errors.password}
                  value={values.password}
                  setValue={handleChange('password')}
                />
                <AuthTextInput
                  label="Confirm Password"
                  placeholder="********"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.confirmPassword}
                  value={values.confirmPassword}
                  setValue={handleChange('confirmPassword')}
                />

                <View style={styles.bottom}>
                  <View style={styles.buttonContainer}>
                    <Button
                      full
                      title="Sign up"
                      isLoading={isLoading}
                      onPress={handleSubmit}
                    />
                  </View>
                  <Text style={styles.question}>Already have an account?</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUpText}>Login!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topContainer: {
    justifyContent: 'center',
    minHeight: 200,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 36,
    color: colors.white,
  },
  mainContent: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },
  textInputContainer: {
    paddingHorizontal: 25,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    width: '100%',
  },
  bottom: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
  },
  question: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.darkgray,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.darkgray,
    textAlign: 'center',
  },
});
