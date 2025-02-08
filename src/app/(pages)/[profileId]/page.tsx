import { ProjectCard } from '@/components/commons/project-card'
import { TotalVisits } from '@/components/commons/total-visits'
import UserCard from '@/components/commons/user-card'
import { auth } from '@/lib/auth'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { getProfileData, getProfileProjects } from '@/server/get-profile-data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NewProjects } from './new-projects'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  const profileId = (await params).profileId

  const session = await auth()

  const profileData = await getProfileData(profileId)

  if (!profileData) {
    return notFound()
  }

  const isOwner = profileData.userId === session?.user?.id

  const projects = await getProfileProjects(profileId)

  return (
    <div className="relative h-screen flex p-24 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button type="button" className="text-accent-green font-bold">
            Faça o upgrade agora
          </button>
        </Link>
      </div>

      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>

      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async project => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={await getDownloadUrlFromPath(project.imagePath)}
          />
        ))}

        {isOwner && <NewProjects profileId={profileId} />}
      </div>

      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  )
}
