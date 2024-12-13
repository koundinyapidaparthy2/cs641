import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Header = ({
  navigation,
  options,
}: {
  navigation: any;
  options: any;
}) => {
  const screenTitle = options?.headerTitle || options?.title || '';

  return (
    <View style={styles.container}>
      {/* Screen Title */}
      <Text style={styles.title}>{screenTitle}</Text>

      {/* Account Button with Initials */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.accountButton}>
        <Text style={styles.accountText}>KP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'transparent',
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  accountButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;
