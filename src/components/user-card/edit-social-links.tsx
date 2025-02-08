'use client'

import { createSocialLinks } from '@/app/actions/create-social-links'
import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'
import Button from '../ui/button'
import Input from '../ui/input'
import { Modal } from '../ui/modal'

export function EditSocialLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)

  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')

  const { profileId } = useParams<{ profileId: string }>()

  const router = useRouter()

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true)

    await createSocialLinks({
      profileId: profileId,
      github,
      linkedin,
      instagram,
      twitter,
    })

    startTransition(() => {
      setIsModalOpen(false)
      setIsSavingSocialLinks(false)
      router.refresh()
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
      >
        <Plus />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div
          className="w-[514px] bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10
        "
        >
          <p className="text-white font-bold text-xl">
            Adicionar redes sociais
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full gap-2">
              <Github />
              <Input
                type="text"
                placeholder="Link Github"
                value={github}
                onChange={e => setGithub(e.target.value)}
              />
            </div>

            <div className="flex items-center w-full gap-2">
              <Linkedin />
              <Input
                type="text"
                placeholder="Link Linkedin"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
              />
            </div>

            <div className="flex items-center w-full gap-2">
              <Instagram />
              <Input
                type="text"
                placeholder="Link Instagram"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
              />
            </div>

            <div className="flex items-center w-full gap-2">
              <Twitter />
              <Input
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              className="text-white font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
