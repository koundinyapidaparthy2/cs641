import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomLayout from './BottomLayout';

const DrawerIcon = ({ navigation } : { navigation: any }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Text style={styles.drawerIcon}>☰</Text> 
  </TouchableOpacity>
);

const MainLayout = ({ navigation: drawerNavigation } : { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BottomLayout drawerNavigation={drawerNavigation} />
      </View>
    </View>
  )
}

export default MainLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topDrawer: {
    paddingTop: 40, // Adjust for top spacing on iOS
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    height: 60,
    justifyContent: 'center',
  },
  drawerIcon: {
    fontSize: 24,
    position: 'absolute',
    
  },
  content: {
    flex: 1,
  },
});