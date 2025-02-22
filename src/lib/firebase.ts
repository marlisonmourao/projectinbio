import { env } from '@/env'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import 'server-only'

// Certificado do Firebase
const decodedPrivateKey = Buffer.from(
  env.FIREBASE_PRIVATE_KEY,
  'base64'
).toString('utf8')

export const firebaseCert = cert({
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedPrivateKey,
})

// Inicialização do Firebase
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
  })
}

export const db = getFirestore()

export const storage = getStorage().bucket()

export async function getDownloadUrlFromPath(path: string) {
  if (!path) return

  const file = storage.file(path)
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: '03-01-2500',
  })

  return url
}
