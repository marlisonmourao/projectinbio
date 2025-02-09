'use client'

import { saveProfile } from '@/app/actions/save-profile'
import { compressFile, handleImageInput, triggerImageInput } from '@/lib/utils'
import type { ProfileData } from '@/server/get-profile-data'
import { ArrowUpFromLine, UserPen } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'
import Button from '../ui/button'
import Input from '../ui/input'
import { Modal } from '../ui/modal'
import TextArea from '../ui/text-area'

export function EditUserCard({ profileData }: { profileData: ProfileData }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [yourName, setYourName] = useState(profileData.name)
  const [yourDescription, setYourDescription] = useState(
    profileData.description
  )

  const router = useRouter()
  const { profileId } = useParams<{ profileId: string }>()

  async function handleSaveProfile() {
    setIsSavingProfile(true)

    const imagesInput = document.getElementById(
      'profile-pic-input'
    ) as HTMLInputElement

    if (!imagesInput.files) {
      return
    }

    const compressedImage = await compressFile(Array.from(imagesInput.files))
    const formData = new FormData()

    formData.append('profileId', profileId)
    formData.append('profilePic', compressedImage[0])
    formData.append('yourName', yourName)
    formData.append('yourDescription', yourDescription)

    await saveProfile(formData)

    startTransition(() => {
      setIsModalOpen(false)

      setIsSavingProfile(false)

      router.refresh()
    })
  }

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        <UserPen />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Editar perfil</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden flex items-center justify-center">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Foto de perfil"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => triggerImageInput('profile-pic-input')}
                  >
                    100x100
                  </button>
                )}
              </div>

              <button
                type="button"
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput('profile-pic-input')}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar foto</span>
              </button>
              <input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setProfilePic(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="text-white font-bold">
                  Seu nome
                </label>
                <Input
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={e => setYourName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="your-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="your-description"
                  placeholder="Fale um pouco sobre você"
                  className="h-36"
                  value={yourDescription}
                  onChange={e => setYourDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              className="font-bold text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
