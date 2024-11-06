import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Account = () => (
  <View style={styles.container}>
    <Text>Account - Mood Tracking</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Account;