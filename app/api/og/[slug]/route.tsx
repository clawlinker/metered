import { NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { getServiceBySlug } from '@/lib/actions';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  const serviceName = service?.name || 'Metered Service';
  const serviceDescription = service?.description || 'Discover, upvote, and review metered APIs';
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            {serviceName}
          </span>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#a5b4fc',
            maxWidth: '700px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {serviceDescription}
        </div>
        <div
          style={{
            fontSize: '20px',
            color: '#6366f1',
            marginTop: '16px',
          }}
        >
          API: GET /api/services
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#6b7280',
            marginTop: '8px',
          }}
        >
          Visit Metered for more services
        </div>
      </div>
    ),
    { ...size }
  );
}
