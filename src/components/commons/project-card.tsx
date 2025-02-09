'use client'

import { formatUrl } from '@/lib/utils'
import type { ProjectData } from '@/server/get-profile-data'
import Link from 'next/link'

interface ProjectCardProps {
  isOwner: boolean
  img: string | undefined
  project: ProjectData
}

export function ProjectCard({ isOwner, img, project }: ProjectCardProps) {
  const formattedUrl = formatUrl(project.projectUrl)

  function handleClick() {
    console.log('depois')
  }

  return (
    <Link href={formattedUrl} target="_blank" onClick={handleClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img src={img} alt="Projeto" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-accent-greenfont-bold text-xs">
              {project.totalVisits} Cliques
            </span>
          )}

          <div className="flex flex-col">
            <span className="text-white font-bold">
              {project.projectName || 'Sem nome'}
            </span>
            <span className="text-content-body text-sm">
              {project.projectDescription || 'Sem descrição'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
