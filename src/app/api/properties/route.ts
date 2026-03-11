import { NextResponse } from 'next/server';

const GIST_URL = "https://gist.githubusercontent.com/caev03/cbe7d4f67f4f3655f876df7b312f9e0c/raw/483c4a692d5836457351c59a37c3f029d9711f5f/apartaments.json";

export async function GET() {
  try {
    console.log('[API] Fetching properties from Gist...');
    
    const response = await fetch(GIST_URL, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('[API] Gist response not ok:', response.status);
      return NextResponse.json(
        { error: `Failed to fetch from Gist: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[API] Successfully fetched properties:', data.length);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
