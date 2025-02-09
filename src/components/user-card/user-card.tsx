import Button from '@/components/ui/button'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { formatUrl } from '@/lib/utils'
import type { ProfileData } from '@/server/get-profile-data'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { AddCustomLink } from './add-custom-link'
import { EditSocialLinks } from './edit-social-links'
import { EditUserCard } from './edit-user-card'

export default async function UserCard({
  isOwner,
  profileData,
}: {
  isOwner: boolean
  profileData: ProfileData
}) {
  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48 ">
        <img
          src={
            profileData.imagePath
              ? await getDownloadUrlFromPath(profileData.imagePath)
              : 'https://robohash.org/default-avatar.png'
          }
          alt=""
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <span className="text-3xl font-bold min-w-0 overflow-x-hidden">
            {profileData?.name}
          </span>

          {isOwner && <EditUserCard profileData={profileData} />}
        </div>

        <p className="opacity-40">{profileData?.description}</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>

        <div className="flex gap-3">
          {profileData?.socialMidias?.github && (
            <Link
              href={profileData?.socialMidias?.github}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#E2E2E2]"
            >
              <Github />
            </Link>
          )}

          {profileData?.socialMidias?.linkedin && (
            <Link
              href={profileData?.socialMidias?.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#E2E2E2]"
            >
              <Linkedin />
            </Link>
          )}

          {profileData?.socialMidias?.instagram && (
            <Link
              href={profileData?.socialMidias?.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#E2E2E2]"
            >
              <Instagram />
            </Link>
          )}

          {profileData?.socialMidias?.twitter && (
            <Link
              href={profileData?.socialMidias?.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#E2E2E2]"
            >
              <Twitter />
            </Link>
          )}

          {isOwner && (
            <EditSocialLinks socialMidias={profileData?.socialMidias} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full min-h-44">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData?.link1 && (
            <Link
              href={formatUrl(profileData?.link1.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData?.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && (
            <Link
              href={formatUrl(profileData?.link2.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData?.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && (
            <Link
              href={formatUrl(profileData?.link3.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData?.link3.title}</Button>
            </Link>
          )}
          {isOwner && <AddCustomLink />}
        </div>
      </div>
    </div>
  )
}
