import { dbGetServices } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || undefined;
  const protocol = url.searchParams.get('protocol') || undefined;
  const sort = url.searchParams.get('sort') || 'votes';
  const timeframe = url.searchParams.get('timeframe') || undefined;
  const limit = parseInt(url.searchParams.get('limit') || '20', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  // Validate category if provided
  const validCategories = ['data', 'trading', 'ai-ml', 'identity', 'social', 'infra'];
  if (category && !validCategories.includes(category)) {
    return NextResponse.json(
      { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
      { status: 400 }
    );
  }

  // Validate protocol if provided
  const validProtocols = ['x402', 'mpp', 'acp', 'other'];
  if (protocol && !validProtocols.includes(protocol)) {
    return NextResponse.json(
      { error: `Invalid protocol. Must be one of: ${validProtocols.join(', ')}` },
      { status: 400 }
    );
  }

  // Get services from DB
  const allServices = await dbGetServices(category);

  // Filter by protocol if specified
  let filtered = allServices;
  if (protocol) {
    filtered = allServices.filter(s => s.protocol === protocol);
  }

  // Sort
  if (sort === 'newest') {
    filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  } else {
    // Default: sort by total upvotes (agent + human)
    filtered.sort((a, b) => (b.agentUpvotes + b.humanUpvotes) - (a.agentUpvotes + a.humanUpvotes));
  }

  // Filter by timeframe
  if (timeframe) {
    const now = new Date();
    const cutoffs: Record<string, number> = {
      daily: 24 * 60 * 60 * 1000,      // 24 hours
      weekly: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    const cutoffMs = cutoffs[timeframe];
    if (cutoffMs) {
      const cutoffDate = new Date(now.getTime() - cutoffMs);
      filtered = filtered.filter(s => new Date(s.submittedAt).getTime() >= cutoffDate.getTime());
    }
  }

  // Apply pagination
  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  // Map to match Service type
  const services = paginated.map(s => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    description: s.description,
    url: s.url,
    protocol: s.protocol,
    category: s.category,
    priceText: s.priceText,
    network: s.network,
    agentUpvotes: s.agentUpvotes,
    humanUpvotes: s.humanUpvotes,
    submittedAt: s.submittedAt,
    verified: s.verified === 1,
  }));

  return NextResponse.json(
    { services, total },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

// Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
