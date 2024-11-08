import axios from 'axios';

const API_URL = 'http://172.20.10.8:5000/api/auth'; // Replace with your backend URL

export interface SignUpPayloadInterface {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
}

export interface SignUpResponse {
  token?: string;
  msg?: string;
}

export const signUpUser = async ({ name, email, password, dateOfBirth }: SignUpPayloadInterface): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(`${API_URL}/register`, { name, email, password, dateOfBirth }, {
      headers: {
        "Content-Type": "application/json", // Set the content type explicitly
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || 'SignUp failed');
  }
};
