import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// This endpoint is called by a Sanity webhook whenever content is published.
// It tells Next.js to regenerate the homepage immediately.
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidatePath('/')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}
