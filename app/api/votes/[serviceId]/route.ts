import { NextRequest, NextResponse } from 'next/server';
import { dbGetVotesForService, dbGetVoteCounts, dbHasVoted } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;
    const { searchParams } = new URL(request.url);
    const voterAddress = searchParams.get('voterAddress');

    const votes = await dbGetVotesForService(serviceId);
    const counts = await dbGetVoteCounts(serviceId);

    let voted = false;
    if (voterAddress) {
      voted = await dbHasVoted(serviceId, voterAddress);
    }

    return NextResponse.json({
      serviceId,
      ...counts,
      total: counts.agentUpvotes + counts.humanUpvotes,
      hasVoted: voted,
      votes: votes.map((v) => ({
        voterAddress: v.voterAddress,
        voterType: v.voterType,
        timestamp: v.timestamp,
      })),
    });
  } catch (err) {
    console.error('Votes GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
