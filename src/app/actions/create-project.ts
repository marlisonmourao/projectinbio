'use server'

import { auth } from '@/lib/auth'
import { db, storage } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'
import { randomUUID } from 'node:crypto'

export async function createProject(formData: FormData) {
  const projectName = formData.get('projectName') as string
  const projectDescription = formData.get('projectDescription') as string
  const projectUrl = formData.get('projectUrl') as string
  const file = formData.get('file') as File
  const profileId = formData.get('profileId') as string

  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const generateId = randomUUID()

  const storageRef = storage.file(`projects-images/${profileId}/${generateId}`)
  const arrayBuffer = await file.arrayBuffer()
  const buffer = await Buffer.from(arrayBuffer)
  await storageRef.save(buffer)

  const imagePath = await storageRef.name

  try {
    await db
      .collection('projects')
      .doc(profileId)
      .collection('projects')
      .doc(generateId)
      .set({
        projectName,
        projectDescription,
        projectUrl,
        userId: session.user.id,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      })
  } catch (error) {}
}
