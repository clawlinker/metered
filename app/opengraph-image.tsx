import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// This function will be called at build time and runtime
// For static generation, we use a fallback OG image
export default async function Image() {
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
            M
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            Metered
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
          Product Hunt for Paid APIs
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#6b7280',
            marginTop: '16px',
          }}
        >
          Discover, upvote, and review metered APIs — x402, MPP, ACP & more
        </div>
      </div>
    ),
    { ...size }
  );
}
