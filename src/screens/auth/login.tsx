import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
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

export default function Login() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {login} = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = Yup.object({
    email: Yup.string().required().min(3).email().trim().label('Email'),
    password: Yup.string().required().min(6).max(255).label('Password'),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.headerTitle}>Welcome back!</Text>
        </View>
        <View style={styles.authContainer}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={values => {
              login(values.email, values.password, setIsLoading);
            }}
            validationSchema={loginSchema}>
            {({handleSubmit, handleChange, values, errors}) => (
              <View style={styles.formikContainer}>
                <View style={styles.mainContent}>
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
                    placeholder="********"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    label="Password"
                    error={errors.password}
                    value={values.password}
                    setValue={handleChange('password')}
                  />
                </View>

                <View style={styles.bottom}>
                  <View style={styles.buttonContainer}>
                    <Button
                      full
                      title="Login"
                      isLoading={isLoading}
                      onPress={handleSubmit}
                    />
                  </View>
                  <Text style={styles.question}>Don't have an account?</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signUpText}>Create one!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topContainer: {
    flex: Dimensions.get('window').height < 700 ? 0.3 : 0.4,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 36,
    color: colors.white,
  },
  authContainer: {
    flex: Dimensions.get('window').height < 700 ? 0.7 : 0.6,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  formikContainer: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 30,
    marginTop: 45,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    width: '100%',
  },
  bottom: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height < 700 ? 0 : 50,
    width: '100%',
    paddingHorizontal: 30,
  },
  question: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.darkgray,
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.darkgray,
    textAlign: 'center',
  },
});
