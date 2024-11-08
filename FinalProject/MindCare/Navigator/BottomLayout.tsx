import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {TabRoutes} from "./routes"
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();


const BottomTabs = ({ drawerNavigation }: { drawerNavigation: any }) => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
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
            headerTitle: route.title || route.name,
            headerShown: route.headerShow ||  false,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: 'blue',
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default BottomTabs