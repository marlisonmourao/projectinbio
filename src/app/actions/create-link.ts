'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

export async function createLink(link: string) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  try {
    await db.collection('profiles').doc(link).set({
      userId: session.user.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis(),
    })
  } catch {
    return false
  }

  return true
}
