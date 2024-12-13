import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Emoji from 'react-native-emoji';
import { useCameraPermissions, CameraView  } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // For audio icon
import StyleTheme from '../theme/StyleTheme';
import { saveMoodRequest } from '../store/moodSlice';

const emojis = [
  'grinning', 'cry', 'rage', 'scream', 'joy', 'heart_eyes', 'sleeping', 
  'sunglasses', 'innocent', 'triumph', 'stuck_out_tongue_winking_eye', 'sob', 
  'grimacing', 'yum', 'exploding_head', 'nerd_face',
];


const Mood = () => {
  const dispatch = useDispatch();

  

  //  Permissions
  const [hasCameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermissionResponse, requestAudioPermission] = Audio.usePermissions();

  // Media
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"back" | "front">("front");
  const cameraRef = useRef<any>(null);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);


  // Extras
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [extraContent, setExtraContent] = useState<{
    text: string;
    image?: string;
    entireImage?: any
  }>({ text: '', image: undefined });


  async function startRecording() {
    setRecording(undefined);

    try {
      if (audioPermissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        await requestAudioPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    try {
      setIsPaused(false);
      await recording?.stopAndUnloadAsync();

      const uri = recording?.getURI();
      console.log('Recording stored at', uri);

      const { sound }: any = await recording?.createNewLoadedSoundAsync();
      setSound(sound);  // Store the sound instance to play later
    } catch (error) {
      console.error('Error stopping recording', error);
    }
  }

  const pauseRecording = async () => {
    if (recording && !isPaused) {
      await recording.pauseAsync();
      setIsPaused(true);
    }
  };

  const resumeRecording = async () => {
    if (recording && isPaused) {
      await recording.startAsync();
      setIsPaused(false);
    }
  };

  const playRecording = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };
  const handleLongPress = () => {
    setIsDeleteVisible(true);
  };

  const deleteRecording = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleWithoutFeedback = () => {
    setIsDeleteVisible(false);
    Keyboard.dismiss();
  };


  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    setModalVisible(true);
  };


  const handleImageCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setExtraContent((prev) => ({ ...prev, image: photo.uri }));
      setCameraVisible(false);
    }
  };

  const handleSaveMood = () => {
    const moodData = {
      emoji: selectedEmoji,
      text: extraContent.text,
      image: extraContent.entireImage,
      recording: recording,
    }
    
    dispatch(saveMoodRequest(moodData)); // Dispatch the action with mood data

    setSelectedEmoji(null);
    setExtraContent({ text: '', image: undefined });
    setModalVisible(false);
  };

   const pickImage = async () => {    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setExtraContent((prev) => ({ ...prev, image: result.assets?.[0].uri, entireImage: result.assets?.[0] }));
    }
  };

  

  if (!hasCameraPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  if (!audioPermissionResponse?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to record audio
        </Text>
        <Button onPress={requestAudioPermission} title="grant permission" />
      </View>
    );
  }

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
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalWrapperContainer}>
            <TouchableWithoutFeedback onPress={handleWithoutFeedback}>
                <View style={styles.modalContent}>
                  {selectedEmoji && <Emoji name={selectedEmoji} style={styles.selectedEmoji} />}  
                  {cameraVisible && (
                    <Modal visible={cameraVisible} transparent={false} animationType="fade">
                      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={cameraFacing}>
                        <View style={styles.cameraControls}>
                          <Button title="Flip" onPress={() => setCameraFacing((prev) => (prev === "back" ? "front" : "back"))} />
                          <Button title="Capture" onPress={handleImageCapture} />
                          <Button title="Close" onPress={() => setCameraVisible(false)} color="red" />
                        </View>
                      </CameraView>
                    </Modal>
                  )}
                  <View style={styles.imageOptions}>
                    {extraContent.image ? <>
                        <Image source={{ uri: extraContent.image }} style={styles.previewImage} />
                        <TouchableOpacity style={styles.removeImage} onPress={() => setExtraContent((prev) => ({ ...prev, image: undefined }))} activeOpacity={1.0}>
                          <MaterialIcons name="delete" size={15} color="white" />
                        </TouchableOpacity>
                      </>
                        :
                          <>
                            <TouchableOpacity style={styles.selectImage} onPress={pickImage} >
                              <MaterialIcons name="photo-album" size={24} color="black" /> 
                              <Text >Pick an image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.selectImage} onPress={() => setCameraVisible(true)}>
                              <MaterialIcons name="camera-alt" size={24} color="black" />
                              <Text >Take an image</Text>
                            </TouchableOpacity>
                          </>
                    }
                  </View>
                  
                    <View style={styles.textInputContainer}>
                        <View>
                          <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={40}
                            style={styles.textInput}
                            onChangeText={(text) => setExtraContent((prev) => ({ ...prev, text }))}
                            value={extraContent.text}
                            placeholder="Add a text or quote"
                          />
                        </View>

                      <View style={styles.audioControlsContainer}>
                        <TouchableOpacity
                          style={styles.audioButton}
                          onPress={
                            recording
                              ? isPaused
                                ? resumeRecording
                                : pauseRecording
                              : startRecording
                          }
                        >
                            <MaterialIcons
                              name={recording ? (isPaused ? 'play-arrow' : 'pause') : 'mic'}
                              size={20}
                              color="white"
                            />
                        </TouchableOpacity>
                        {recording && (
                          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
                            <MaterialIcons name="stop" size={20} color="white" />
                          </TouchableOpacity>
                        )}
                        {sound && (
                          <>
                            <TouchableOpacity style={styles.playButton} 
                              onPress={()=> playRecording()} 
                              onLongPress={()=> handleLongPress()}>
                              <MaterialIcons name="play-arrow" size={20} color="white" />
                            </TouchableOpacity>
                            {isDeleteVisible && (
                              <TouchableOpacity style={styles.deleteRecordingButton} onPress={deleteRecording}>
                                <MaterialIcons name="delete" size={15} color="white" />
                              </TouchableOpacity>
                            )}
                          </>
                        )}
                      </View>
                      
                    </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSaveMood}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </TouchableWithoutFeedback>  
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
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
  },


  // Emoji styles
  emoji: {
    fontSize: 35,
    margin: 10,
  },
  selectedEmoji: {
    fontSize: 50,
    alignSelf: 'center',
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


  // Modal styles
  modalWrapperContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
  modalHeader: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'center',
  },

  // Text input styles
  textInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Image styles
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  previewImage: {
    width: '80%',
    height: 'auto', 
    aspectRatio: 1,
    marginTop: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 8,
  },
  removeImage:{
    position: 'absolute',
    top: -10,
    right: 15,
    backgroundColor: '#FF5757',
    borderRadius: 50,
    padding: 10,
  },
  imageOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectImage:{
    width: '49%',
    height: 100,
    backgroundColor: '#ffffff8c',
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    shadowColor: '#FFFFFF',
    borderStyle: 'dashed',
    borderWidth: 1, // Set border width
    borderColor: '#000000', // Set border color
    display: 'flex',
    flexDirection: 'column', // Column to stack the text vertically
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    gap: 10,
  },

  // Audio styles
  audioControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },  
  audioButton: {
    backgroundColor: '#FF5757',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#FF5757',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  playButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  stopButton: {
    backgroundColor: '#FF3B30', // Red color to indicate "stop" action
    padding: 10,
    borderRadius: 50, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Space between stop and pause/play buttons
  },
  deleteRecordingButton: {
    backgroundColor: '#FF5757',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#FF5757',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    position: 'absolute',
    top: -40,
    right: 0,
  },

  // Button styles
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 20,
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: StyleTheme.colors.primary,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  cancelButtonText:{
    color: '#FF5757',
    fontWeight: 'bold',
  },
});

export default Mood;
