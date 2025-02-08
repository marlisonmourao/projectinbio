import Button from '@/components/ui/button'
import type { ProfileData } from '@/server/get-profile-data'
import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import Link from 'next/link'
import { EditSocialLinks } from './edit-social-links'

export default function UserCard({
  profileData,
}: { profileData?: ProfileData }) {
  const icons = [Github, Instagram, Linkedin, Twitter]

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48 ">
        <img
          src="https://github.com/marlisonmourao.png"
          alt=""
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <span className="text-3xl font-bold min-w-0 overflow-x-hidden">
            Marlison Mourão
          </span>
        </div>

        <p className="opacity-40">"Eu faço produtos para a internet"</p>
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

          <EditSocialLinks socialMidias={profileData?.socialMidias} />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full h-44">
        <div className="w-full flex flex-col items-center gap-3">
          <Button className="w-full">Template SaaS - Compre agora</Button>

          <button
            type="button"
            className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  )
}
