import axios from 'axios';

const API_URL = 'http://172.20.10.8:5000/api/auth'; // Replace with your backend URL

export interface LoginPayloadInterface {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  msg?: string;
}

export const loginUser = async ({ email, password }: LoginPayloadInterface): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password }, {
      headers: {
      "Content-Type": "application/json", // Set the content type explicitly
      }
    });
    return response.data; // Assumes response contains { token: '...' }
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || 'Login failed');
  }
};


