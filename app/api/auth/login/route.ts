import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Use withCredentials to ensure cookies are sent and received
    const apiRes = await api.post('/auth/login', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    console.log('Login response status:', apiRes.status);
    console.log('Login response data:', apiRes.data);
    console.log('Set-Cookie headers:', setCookie);

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        console.log('Parsed cookie:', parsed);

        const options = {
          expires: parsed.expires ? new Date(parsed.expires) : undefined,
          path: parsed.path || '/',
          maxAge: parsed['max-age'] ? Number(parsed['max-age']) : undefined,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
        };

        // The API returns cookies with format like: accessToken=xxx; refreshToken=xxx
        // We need to extract the values
        if (cookieStr.includes('accessToken=')) {
          const accessTokenMatch = cookieStr.match(/accessToken=([^;]+)/);
          if (accessTokenMatch) {
            cookieStore.set('accessToken', accessTokenMatch[1], options);
          }
        }
        if (cookieStr.includes('refreshToken=')) {
          const refreshTokenMatch = cookieStr.match(/refreshToken=([^;]+)/);
          if (refreshTokenMatch) {
            cookieStore.set('refreshToken', refreshTokenMatch[1], options);
          }
        }
      }

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized - No cookies set' }, { status: 401 });
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
