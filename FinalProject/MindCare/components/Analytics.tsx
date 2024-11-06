import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Analytics = () => (
  <View style={styles.container}>
    <Text>Analytics - Mood Tracking</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Analytics;