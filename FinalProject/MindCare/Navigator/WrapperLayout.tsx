import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainLayout from './MainLayout';
import Settings from '../components/Settings';
import Account from '../components/Account';
import Header from '../components/Header';


const Drawer = createDrawerNavigator();

const WrapperLayout = () => {
  return (

    <Drawer.Navigator initialRouteName="MainLayout" screenOptions={{
      headerTransparent: true,
    }}>
        <Drawer.Screen name="MainLayout" component={MainLayout} options={{ headerShown: false,
          
          }} />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            header: (props) => <Header {...props}  />,
            
          }}
        />

      {/* Account Screen */}
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          header: (props) => <Header {...props}  />,
        }}
      />
    </Drawer.Navigator>
  );
};



export default WrapperLayout;
