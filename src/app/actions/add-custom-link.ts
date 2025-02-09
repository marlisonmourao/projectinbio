'use server'

import { db } from '@/lib/firebase'

export type Link = {
  title: string
  url: string
}

export async function addCustomLink(links: {
  link1: Link
  link2: Link
  link3: Link
  profileId: string
}) {
  const { link1, link2, link3, profileId } = links

  try {
    await db.collection('profiles').doc(profileId).update({
      link1,
      link2,
      link3,
    })
  } catch (error) {
    console.error(error)
  }
}
