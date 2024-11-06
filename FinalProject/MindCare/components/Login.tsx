import React, { useState } from 'react';
import { View, Text, Pressable, Alert, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, StyleSheet, ImageBackground } from 'react-native';

import { useDispatch } from 'react-redux';
import { logIn } from '../store/authSlice';

import { AppDispatch } from '../store';
import StyleTheme from '../theme/StyleTheme';
import * as Animatable from 'react-native-animatable';


const Login = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    if (email && password) {
      dispatch(logIn());
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
       source={require('../assets/login_background.png')}
       style={styles.backgroundImage}
      >
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
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Log In</Text>
        </Pressable>

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
      </ImageBackground>
    </TouchableWithoutFeedback>

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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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