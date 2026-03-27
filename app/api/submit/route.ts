import { NextRequest, NextResponse } from 'next/server';
import { dbAddService } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, description, protocol, category, price, network, contact } = body;

    // Validate required fields
    if (!name || !url || !description || !protocol || !category || !price || !network || !contact) {
      return NextResponse.json(
        { error: 'Missing required fields: name, url, description, protocol, category, price, network, contact' },
        { status: 400 }
      );
    }

    const result = await dbAddService(name, url, description, protocol, category, price, network, contact);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id, slug: result.slug });
  } catch (err) {
    console.error('Submit API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
