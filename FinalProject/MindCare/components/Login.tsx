import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../store/authSlice';

import { AppDispatch, RootState } from '../store';
import StyleTheme from '../theme/StyleTheme';
import * as Animatable from 'react-native-animatable';


const Login = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogin = () => {
    console.log(email, password);
    if (email && password) {
      dispatch(loginRequest({ email, password }));
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Main');
    }
  }, [isLoggedIn, navigation]);
  return (
      <ImageBackground
       source={require('../assets/login_background.png')}
       style={styles.backgroundImage}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: StyleTheme.spacing.medium,
            backgroundColor: StyleTheme.colors.opacityBacground,
            width: '100%',
          }}>
            <Animatable.Text
              style={[StyleTheme.glowingText, { marginBottom: StyleTheme.spacing.large }]}
              animation="pulse"
              iterationCount="infinite"
              duration={1500}
            >
              MIND CARE
            </Animatable.Text>
            <Text style={{
              fontSize: StyleTheme.fontSizes.body,
              color: StyleTheme.colors.textSecondary,
              marginBottom: StyleTheme.spacing.large,
              textAlign: 'center',
              width: '80%',
            }}>
              Take care of your mental health with daily journaling, exercises, and support.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={StyleTheme.colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={StyleTheme.colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            
            {loading ? (
              <ActivityIndicator size="large" color={StyleTheme.colors.primary} />
            ) : (
              <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Forgot Password functionality coming soon.')}>
              <Text style={{
                marginTop: StyleTheme.spacing.medium,
                color: StyleTheme.colors.link,
                textDecorationLine: 'underline',
              }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{
                marginTop: StyleTheme.spacing.medium,
                color: StyleTheme.colors.link,
                textDecorationLine: 'underline',
              }}>
                Don’t have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>

  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: StyleTheme.colors.primary,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: StyleTheme.spacing.small,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: StyleTheme.spacing.small,
    marginVertical: StyleTheme.spacing.small,
    borderWidth: 1,
    borderColor: StyleTheme.colors.secondary,
    borderRadius: 8,
    backgroundColor: StyleTheme.colors.white,
  },
});

export default Login;