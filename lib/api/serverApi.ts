import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL + '/api'
  : 'http://localhost:3000/api';

async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Notes
export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) => {
  const queryString = new URLSearchParams();
  if (params?.search) queryString.append('search', params.search);
  if (params?.page) queryString.append('page', params.page.toString());
  if (params?.perPage) queryString.append('perPage', params.perPage.toString());
  if (params?.tag) queryString.append('tag', params.tag);

  const endpoint = queryString.toString()
    ? `/notes?${queryString.toString()}`
    : '/notes';

  return fetchFromAPI(endpoint);
};

export const fetchNoteById = async (id: string) => {
  return fetchFromAPI(`/notes/${id}`);
};

// Auth
export const getMe = async () => {
  return fetchFromAPI('/users/me');
};

export const checkSession = async () => {
  return fetchFromAPI('/auth/session');
};
