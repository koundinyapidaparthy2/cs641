import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Emoji from 'react-native-emoji'; // Optional library for emojis
import * as ImagePicker from 'expo-image-picker'; 

const emojis = [
  'grinning', 'cry', 'rage', 'scream', 'joy', 'heart_eyes', 'sleeping', 
  'sunglasses',  'innocent', 'triumph', 'stuck_out_tongue_winking_eye', 'sob', 
  'grimacing', 'yum', 'exploding_head', 'nerd_face',
];

// Request Camera Permission on Android
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  // No need to request permission for iOS as it's handled by Info.plist
  return true;
};




const Mood = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [extraContent, setExtraContent] = useState<{ text: string; image: string | undefined }>({
    text: '',
    image: undefined,
  });
  const [modalVisible, setModalVisible] = useState(false);

  // Handle emoji selection
  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    setModalVisible(true);
  };

  // Handle image selection from camera using Expo's ImagePicker
  const handleImageCapture = async () => {
    // Ask for camera permission if not already granted
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required to capture photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setExtraContent((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  // Handle submission to backend
  const handleSaveMood = () => {
    const moodData = {
      emoji: selectedEmoji,
      text: extraContent.text,
      image: extraContent.image,
    };

    // Submit moodData to your backend
    // Replace with your API call here
    console.log("Mood data saved:", moodData);

    // Reset state and close modal
    setSelectedEmoji(null);
    setExtraContent({ text: '', image: undefined });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How Are You Feeling Today?</Text>

      <View style={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmojiPress(emoji)}>
            <Emoji name={emoji} style={styles.emoji} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for additional content */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add Details</Text>
          {selectedEmoji && <Emoji name={selectedEmoji} style={styles.selectedEmoji} />}

          <TextInput
            placeholder="Add a text or quote"
            style={styles.textInput}
            onChangeText={(text) => setExtraContent((prev) => ({ ...prev, text }))}
            value={extraContent.text}
          />

          <Button title="Add a Photo" onPress={handleImageCapture} />
          {extraContent.image && <Text>Image added!</Text>}

          <Button title="Save Mood" onPress={handleSaveMood} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  emoji: {
    fontSize: 35,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'center',
  },
  selectedEmoji: {
    fontSize: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default Mood;
