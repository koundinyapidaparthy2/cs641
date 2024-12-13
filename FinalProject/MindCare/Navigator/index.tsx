import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ActivityIndicator, View, Text } from 'react-native';
import Login from '../components/Login';
import SignUp from "../components/SignUp";
import WrapperLayout from './WrapperLayout';
import StyleTheme from '../theme/StyleTheme';
import { initializeAuthRequest } from '../store/authSlice';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const {loading, isLoggedIn} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(initializeAuthRequest()); // Dispatch action to initialize auth state on app load
  }, [dispatch]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <NavigationContainer theme={StyleTheme.navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Show Main App if logged in
          <Stack.Screen name="Main" component={WrapperLayout} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator