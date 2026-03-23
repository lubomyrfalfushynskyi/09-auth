import { api } from './api';
import { Note, CreateNoteDto } from '@/types/note';

// Notes
export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<{ notes: Note[]; totalPages: number }> => {
  const { data } = await api.get('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

// Auth
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    email: string;
    username: string;
    avatar: string;
  };
}

export const register = async (data: RegisterData): Promise<AuthResponse['user']> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data.user;
};

export const login = async (data: LoginData): Promise<AuthResponse['user']> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<AuthResponse['user'] | null> => {
  const response = await api.get<AuthResponse['user'] | null>('/auth/session');
  return response.data;
};

// User
export const getMe = async (): Promise<{
  email: string;
  username: string;
  avatar: string;
}> => {
  const { data } = await api.get('/users/me');
  return data;
};

interface UpdateMeData {
  username?: string;
}

export const updateMe = async (data: UpdateMeData): Promise<{
  email: string;
  username: string;
  avatar: string;
}> => {
  const { data: responseData } = await api.patch('/users/me', data);
  return responseData;
};
