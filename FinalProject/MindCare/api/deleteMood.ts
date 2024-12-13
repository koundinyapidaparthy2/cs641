// src/api.js
import axios from 'axios';

const API_URL = 'http://172.20.10.8:5000/api/moods'; // Replace with your backend URL


export const deleteMood = async (moodId: string, token: string) => {
    console.log({moodId, token, url: `${API_URL}/deleteMood/${moodId}`})
  const response = await axios.post(`${API_URL}/deleteMood`, 
    { id: moodId }, // Send the mood ID in the request body
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};
