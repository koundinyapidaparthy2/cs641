import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import BottomLayout from './BottomLayout';

const MainLayout = ({ navigation: drawerNavigation }: { navigation: any }) => {
  return (
      <ImageBackground
        source={require('../assets/Mindcare.png')} // Ensure the file path is correct
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }} // Adjust opacity for visibility
      >
        <BottomLayout drawerNavigation={drawerNavigation} />
      </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the view
  },
});
