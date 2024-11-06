import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Mood = () => (
  <View style={styles.container}>
    <Text>Mood - Mood Tracking</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Mood;