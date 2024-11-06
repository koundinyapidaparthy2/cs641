import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {TabRoutes} from "./routes"

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }: {navigation: any}) => {
  return (
    <Tab.Navigator>
      {TabRoutes.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Tab.Navigator>
  );
}

export default BottomTabs