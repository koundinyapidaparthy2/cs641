import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const API_URL = 'http://172.20.10.8:5000/api/moods'; // Replace with your backend URL

export const getMoods = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${API_URL}/getMoods`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response; // Returning the response directly
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error(error.response?.data?.msg || 'Failed to fetch moods');
  }
};
