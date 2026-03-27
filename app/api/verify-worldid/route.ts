import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proof, nullifier_hash, merkle_root, verification_level, action, signal } = body;

    if (!proof || !nullifier_hash || !merkle_root) {
      return NextResponse.json(
        { error: 'Missing required World ID proof fields' },
        { status: 400 }
      );
    }

    const appId = process.env.NEXT_PUBLIC_WORLDID_APP_ID || 'app_staging_placeholder';
    const actionName = action || 'upvote-service';

    // Verify with World ID cloud API
    const verifyUrl = `https://developer.worldcoin.org/api/v2/verify/${appId}`;

    const verifyRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nullifier_hash,
        merkle_root,
        proof,
        verification_level: verification_level || 'orb',
        action: actionName,
        signal: signal || '',
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok) {
      console.error('World ID verification failed:', verifyData);
      return NextResponse.json(
        { error: verifyData.detail || 'World ID verification failed', code: verifyData.code },
        { status: 400 }
      );
    }

    // Return nullifier_hash as the unique identifier for this verified human
    return NextResponse.json({
      success: true,
      nullifier_hash,
      verification_level: verification_level || 'orb',
    });
  } catch (err) {
    console.error('verify-worldid error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
