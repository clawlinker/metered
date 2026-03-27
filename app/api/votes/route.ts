import { NextRequest, NextResponse } from 'next/server';
import { dbAddVote, dbGetVoteCounts } from '@/lib/db';
import { verifyVoteSignature } from '@/lib/verifySignature';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, voterAddress, voterType = 'wallet', signature } = body;

    if (!serviceId || !voterAddress || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId, voterAddress, signature' },
        { status: 400 }
      );
    }

    // Verify signature for all voter types (wallet and erc8004)
    const sigResult = await verifyVoteSignature(voterAddress, signature, serviceId);

    if (!sigResult.valid) {
      return NextResponse.json(
        { error: sigResult.error || 'Signature verification failed' },
        { status: 401 }
      );
    }

    const result = await dbAddVote(serviceId, voterAddress, voterType, signature);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    const counts = await dbGetVoteCounts(serviceId);
    return NextResponse.json({ success: true, ...counts });
  } catch (err) {
    console.error('Vote API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
