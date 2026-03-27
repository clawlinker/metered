import { dbGetServices, dbGetVoteCounts } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' },
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Get all services from DB
  const allServices = await dbGetServices();

  // Find service by slug
  const serviceRow = allServices.find(s => s.slug === slug);

  if (!serviceRow) {
    return NextResponse.json(
      { error: `Service not found: ${slug}` },
      { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Get current vote counts from DB
  const voteCounts = await dbGetVoteCounts(serviceRow.id);

  // Map to match Service type
  const service = {
    id: serviceRow.id,
    name: serviceRow.name,
    slug: serviceRow.slug,
    description: serviceRow.description,
    url: serviceRow.url,
    protocol: serviceRow.protocol,
    category: serviceRow.category,
    priceText: serviceRow.priceText,
    network: serviceRow.network,
    agentUpvotes: serviceRow.agentUpvotes,
    humanUpvotes: serviceRow.humanUpvotes,
    submittedAt: serviceRow.submittedAt,
    verified: serviceRow.verified === 1,
    // Include live vote counts from the DB
    voteCounts,
  };

  return NextResponse.json(
    service,
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
