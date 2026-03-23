import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

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

export async function GET(request: NextRequest) {
  try {
    const api = await createApiWithCookies();
    const search = request.nextUrl.searchParams.get('search') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const rawTag = request.nextUrl.searchParams.get('tag') ?? '';
    const tag = rawTag === 'All' ? '' : rawTag;

    const res = await api.get('/notes', {
      params: {
        ...(search !== '' && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
    });

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

export async function POST(request: NextRequest) {
  try {
    const api = await createApiWithCookies();
    const body = await request.json();

    const res = await api.post('/notes', body);

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
