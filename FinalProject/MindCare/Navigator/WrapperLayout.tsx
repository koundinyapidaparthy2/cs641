import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainLayout from './MainLayout';
import Settings from '../components/Settings';
import Account from '../components/Account';


const Drawer = createDrawerNavigator();

const WrapperLayout = () => {
  return (
    <Drawer.Navigator initialRouteName="MainLayout">
        <Drawer.Screen name="MainLayout" component={MainLayout} options={{ headerShown: false }} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Account" component={Account} />
    </Drawer.Navigator>
  );
};

export default WrapperLayout;
