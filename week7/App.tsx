import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, NavigatorScreenParams} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function Home({navigation}: {navigation: any}) {
  return (
      <View style={styles.container}>
        <Text>This is home screen</Text>
          <Button title={"Account"} onPress={() => navigation.navigate('Account')}/>
          <Button title={"Settings"} onPress={() => navigation.navigate('Settings')}/>
      </View>
  );
}
function Account({navigation}: {navigation: any}) {
    return (
        <View style={styles.container}>
            <Text>This is Account screen</Text>
            <Button title={"MyAddress"} onPress={() => navigation.navigate('MyAddress')}/>
        </View>
    );
}

function MyAddress({navigation}: {navigation: any}) {
    return (
        <View style={styles.container}>
            <Text>This is My Address screen</Text>
            <Button title={"Navigate To Home"} onPress={() => navigation.navigate('Home')}/>

        </View>
    );
}


function Settings({navigation}: {navigation: any}) {
    return (
        <View style={styles.container}>
            <Text>This is settings screen</Text>
            <Button title={"Settings Again"} onPress={() => navigation.popTo('Settings')}/>
        </View>
    );
}


export default function App() {
  return (

      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Settings" component={Settings}/>
          <Drawer.Screen name="Account" component={Account}/>
          <Drawer.Screen name="MyAddress" component={MyAddress}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});