import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => (
  <View style={styles.container}>
    <Text>Settings - Mood Tracking</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;