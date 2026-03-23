import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ id: string }>;
};

async function createApiWithCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const axios = (await import('axios')).default.create({
    baseURL: 'https://notehub-api.goit.study',
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  return axios;
}

export async function GET(request: Request, { params }: Props) {
  try {
    const api = await createApiWithCookies();
    const { id } = await params;
    const res = await api.get(`/notes/${id}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const api = await createApiWithCookies();
    const { id } = await params;
    const res = await api.delete(`/notes/${id}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const api = await createApiWithCookies();
    const { id } = await params;
    const body = await request.json();
    const res = await api.patch(`/notes/${id}`, body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
