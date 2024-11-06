import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Login from '../components/Login';
import SignUp from "../components/SignUp";
import WrapperLayout from './WrapperLayout';
import StyleTheme from '../theme/StyleTheme';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
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