import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/authSlice';
const Account = () => {
  const dispatch = useDispatch();
  return <View style={styles.container}>
    <Pressable onPress={() => dispatch(logOut())}>
      <Text>Logout</Text>
    </Pressable>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Account;