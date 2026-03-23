export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // Create axios instance without withCredentials to manually pass cookies
    const axios = (await import('axios')).default.create({
      baseURL: 'https://notehub-api.goit.study',
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    const res = await axios.get('/users/me');
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

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // Create axios instance without withCredentials to manually pass cookies
    const axios = (await import('axios')).default.create({
      baseURL: 'https://notehub-api.goit.study',
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    const res = await axios.patch('/users/me', body);
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
