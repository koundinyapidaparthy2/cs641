// src/api/moodApi.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Audio } from 'expo-av';

const API_URL = 'http://172.20.10.8:5000/api/moods'; // Replace with your backend URL

export interface MoodData {
  emoji: string | null;
  text?: string;
  image?: {
    uri: string;
    mimeType: string;
  };
  recording?: Audio.Recording;
}
export const saveMood = async ({emoji, text, image, recording}: MoodData) => {
  try {
    const finalData = new FormData();
    finalData.append('emoji', emoji as any);
    finalData.append('text', text as any);
    // Add image if available
    if (image) {
      console.log({img: image}) 
      const uri = image.uri;
      const imageData = {
        uri: uri,
        type: image.mimeType, // Make sure to set the correct MIME type
        name: uri.split('/').pop(),

      };
      finalData.append('image', imageData as any);
    }
    // Add audio if available
    if (recording) {
      console.log({audio: recording}) 
      const audioUri = recording.getURI();
      if (audioUri) {
        const audioData = {
          uri: audioUri,
          type: 'audio/m4a', // Set the correct MIME type
          name: audioUri.split('/').pop(),
        };
        finalData.append('audio', audioData as any);
      }
    }
    const token = await AsyncStorage.getItem('authToken');
    console.log({finalData})
    const response = await axios.post(`${API_URL}/saveMood`, finalData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    });
    console.log({response})
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || 'Failed Save Mood');
  }
};
