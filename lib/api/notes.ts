import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note';

// Use the new auth API through our route handlers
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params?: { search?: string; tag?: string; page?: number; perPage?: number }): Promise<NotesResponse> => {
  try {
    const cleanParams: Record<string, string | number> = {};
    if (params?.page) cleanParams.page = params.page;
    if (params?.perPage) cleanParams.perPage = params.perPage;
    if (params?.tag && params.tag !== 'all') cleanParams.tag = params.tag;
    if (params?.search && params.search.trim() !== '') cleanParams.search = params.search;

    const { data } = await api.get<NotesResponse>('/notes', { params: cleanParams });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || error.message;
      throw new Error(`API Error ${status}: ${msg}`);
    }
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
  const { data } = await api.patch<Note>(`/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
