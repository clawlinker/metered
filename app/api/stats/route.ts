import { dbGetServices } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const services = await dbGetServices();
  
  const totalServices = services.length;
  const totalAgentUpvotes = services.reduce((sum, s) => sum + s.agentUpvotes, 0);
  const totalHumanUpvotes = services.reduce((sum, s) => sum + s.humanUpvotes, 0);
  
  return NextResponse.json(
    {
      totalServices,
      totalAgentUpvotes,
      totalHumanUpvotes,
    },
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
