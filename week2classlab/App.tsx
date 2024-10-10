import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, ScrollView, Image,Button } from 'react-native';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';

export default function App() {
  const [counter,setCounter] = useState(0);
  return (
    <ScrollView style={styles.scrollView}>
      <FirstComponent counter={counter} />
      <SecondComponent counter={counter} />
      <Button onPress={()=>setCounter(counter+1)} title="Increment" />
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
  scrollView: {
    marginTop: 50

  },
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
