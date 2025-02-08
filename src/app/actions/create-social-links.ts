'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

export async function createSocialLinks({
  profileId,
  github,
  linkedin,
  instagram,
  twitter,
}: {
  profileId: string
  github: string
  linkedin: string
  instagram: string
  twitter: string
}) {
  const session = await auth()

  if (!session) {
    return
  }

  try {
    await db.collection('profiles').doc(profileId).update({
      socialMidias: {
        github,
        linkedin,
        instagram,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
