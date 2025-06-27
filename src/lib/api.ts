export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
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

export interface UpdateProfilePayload {
  name?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  interests?: string[];
}

export interface CreateProfilePayload {
  name: string;
  birthday: string;
  height: number;
  weight: number;
  interests: string[];
  image?: File;
}

// ✅ Base URL dari .env.local
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/* ---------------- REGISTER ---------------- */
export async function registerUser(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Register failed');
  return data;
}

/* ---------------- LOGIN ---------------- */
export async function loginUser(payload: LoginPayload) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login failed');

  const token = data.access_token;
  if (typeof token !== 'string') {
    throw new Error('Email or password doesn’t match. Please try again.');
  }

  localStorage.setItem('youapp_token', token);

  return { success: true, message: data.message };
}

/* ---------------- GET PROFILE ---------------- */
export async function getProfile(): Promise<UserProfile> {
  const token = localStorage.getItem('youapp_token');
  if (!token) throw new Error('Token not found. Please login.');

  const res = await fetch(`${API_BASE}/getProfile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
  if (!data.data) throw new Error('Profile data not found');

  return data.data;
}

/* ---------------- UPDATE PROFILE ---------------- */
export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
  const token = localStorage.getItem('youapp_token');
  if (!token) throw new Error('Token not found. Please login.');

  const res = await fetch(`${API_BASE}/updateProfile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update profile');
  if (!data.data) throw new Error('Profile update failed: No data returned');

  return data.data;
}

/* ---------------- CREATE/UPDATE PROFILE w/ IMAGE ---------------- */
export async function createOrUpdateProfile(payload: CreateProfilePayload) {
  const token = localStorage.getItem('youapp_token');
  if (!token) throw new Error('Token not found. Please login.');

  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('birthday', payload.birthday);
  formData.append('height', payload.height.toString());
  formData.append('weight', payload.weight.toString());

  if (payload.interests.length > 0) {
    payload.interests.forEach((i) => formData.append('interests', i));
  } else {
    formData.append('interests', '[]');
  }

  if (payload.image) {
    formData.append('image', payload.image, payload.image.name);
  }

  const res = await fetch(`${API_BASE}/createProfile`, {
    method: 'POST',
    headers: { 'x-access-token': token },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create/update profile');

  return data;
}
