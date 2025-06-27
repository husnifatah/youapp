export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const API_URL = 'http://techtest.youapp.ai/api/register';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;

  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

export interface LoginPayload {
  email?: string; 
  username?: string;
  password: string;
}
export async function loginUser(payload: LoginPayload) {
  const API_URL = 'http://techtest.youapp.ai/api/login';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "You're signed in — welcome back!");
    }

    const token = data.access_token;
    if (typeof token !== 'string') {
        throw new Error('Email or password doesn’t match. Please try again.');
    }

    localStorage.setItem('youapp_token', token);

    return { success: true, message: data.message };

  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export interface UserProfile {
  email: string;
  username: string;
  interests: string[];
}

export async function getProfile(): Promise<UserProfile> {
  const API_URL = 'http://techtest.youapp.ai/api/getProfile';
  
  console.log("Requesting profile from URL:", API_URL);
  // -------------------------

  const token = localStorage.getItem('youapp_token');

  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch profile.');
    }
    if (!result.data) {
      throw new Error("Profile data not found in API response.");
    }
    return result.data;
  } catch (error) {
    console.error('Failed to get profile:', error);
    throw error;
  }
}

export interface UpdateProfilePayload {
  name?: string;
  birthday?: string; 
  height?: number;
  weight?: number;
  interests?: string[];
}

export interface UserProfile {
  email: string;
  username: string;
  name?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  interests: string[];
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
  const API_URL = 'http://techtest.youapp.ai/api/updateProfile';
  
  const token = localStorage.getItem('youapp_token');
  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update profile.');
    }

    if (!result.data) {
      throw new Error("Profile data not found in API response.");
    }

    return result.data as UserProfile;

  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}

export interface CreateProfilePayload {
  name: string;
  birthday: string;
  height: number;
  weight: number;
  interests: string[];
  image?: File;
}

export async function createOrUpdateProfile(payload: CreateProfilePayload) {
  const API_URL = 'http://techtest.youapp.ai/api/createProfile';
  const token = localStorage.getItem('youapp_token');

  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  const formData = new FormData();

  formData.append('name', payload.name);
  formData.append('birthday', payload.birthday);
  formData.append('height', payload.height.toString());
  formData.append('weight', payload.weight.toString());
  
  if (payload.interests && payload.interests.length > 0) {
    payload.interests.forEach(interest => {
      formData.append('interests', interest);
    });
  } else {
    formData.append('interests', '[]');
  }
  
  if (payload.image) {
    formData.append('image', payload.image, payload.image.name);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Server Error Response:', result);
      throw new Error(result.message || 'Failed to update profile.');
    }

    return result;
  } catch (error) {
    console.error('Failed to create/update profile:', error);
    throw error;
  }
}