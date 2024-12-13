import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {TabRoutes} from "./routes"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();


const BottomLayout = ({ drawerNavigation }: { drawerNavigation: any }) => {
  return (
    
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarStyle: {
            elevation: 0,
          },
        }}
      >
        {TabRoutes.map((route) => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? route.icon.replace('-outline', '') : route.icon}
                  size={24}
                  color={color}
                />
              ),
              header: (props) => (
                <Header {...props} navigation={drawerNavigation} />
              ), 
              
            }}
          />
        ))}
      </Tab.Navigator>
  );
}


export default BottomLayout

