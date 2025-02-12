import { auth } from '@/lib/auth'
import { getProfileId } from '@/server/get-profile-data'
import { redirect } from 'next/navigation'
import type React from 'react'

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  const profileId = await getProfileId({
    userId: session.user?.id as string,
  })

  if (profileId) {
    redirect(`/${profileId}`)
  }

  return <>{children}</>
}
