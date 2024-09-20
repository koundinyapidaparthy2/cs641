import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, ScrollView, Image } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <Text>Koundinya Pidaparthy</Text>
      <Text>Text 1</Text>
      <Text>Text 2</Text>
      <ActivityIndicator />
      <Image source={{uri:'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'}} style={styles.tinyLogo} ></Image>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo:{
    width:500,
    height:500
  }
});
