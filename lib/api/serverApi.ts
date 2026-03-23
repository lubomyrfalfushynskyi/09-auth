import axios from 'axios';
import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import type { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL + '/api'
  : 'http://localhost:3000/api';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<NotesResponse> => {
  const cookieStore = cookies();
  const { data } = await axios.get<NotesResponse>('/notes', {
    baseURL: API_URL,
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    baseURL: API_URL,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await axios.get<User>('/users/me', {
    baseURL: API_URL,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = cookies();
  const { data } = await axios.get<User | null>('/auth/session', {
    baseURL: API_URL,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

