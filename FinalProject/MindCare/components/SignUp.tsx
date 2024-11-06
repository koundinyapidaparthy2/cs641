import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, StyleSheet,
  Pressable, TouchableWithoutFeedback, Keyboard, ImageBackground
 } from 'react-native';

import { useDispatch } from 'react-redux';
import { logIn } from '../store/authSlice';

import { AppDispatch } from '../store';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import StyleTheme from '../theme/StyleTheme';
import * as Animatable from 'react-native-animatable';


const SignUp = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSignUp = () => {
    if (password === confirmPassword) {
      // Handle sign-up logic here, like calling API and saving user
      dispatch(logIn());
      Alert.alert('Success', 'Account created successfully!');
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

   return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground
       source={require('../assets/login_background.png')}
       style={styles.backgroundImage}
      >
      <View style={styles.container}>
        <Animatable.Text
          style={[StyleTheme.glowingText, { marginBottom: StyleTheme.spacing.large }]}
          animation="pulse"
          iterationCount="infinite"
          duration={1500}
        >
          MIND CARE
        </Animatable.Text>
        <Text style={styles.description}>
          Create an account to start your mental wellness journey.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>
            {birthDate ? birthDate.toDateString() : 'Select Birthdate'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText}>
            Already have an account? Login
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
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: StyleTheme.spacing.medium,
    backgroundColor: StyleTheme.colors.opacityBacground,
    width: '100%',
  },
  title: {
    fontSize: StyleTheme.fontSizes.title,
    fontWeight: 'bold',
    color: StyleTheme.colors.textPrimary,
    marginBottom: StyleTheme.spacing.large,
    textShadowColor: StyleTheme.colors.secondary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 16,
    color: StyleTheme.colors.textSecondary,
    marginBottom: StyleTheme.spacing.large,
    textAlign: 'center',
    width: '90%',
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
  datePickerText: {
    width: '100%',
    paddingHorizontal: StyleTheme.spacing.medium,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: StyleTheme.colors.textPrimary,
    fontSize: 16,
    borderColor: StyleTheme.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: StyleTheme.colors.white,
    marginBottom: StyleTheme.spacing.small,
  },
  switchText: {
    marginTop: StyleTheme.spacing.medium,
    color: StyleTheme.colors.link,
    textDecorationLine: 'underline',
  },
});

export default SignUp;