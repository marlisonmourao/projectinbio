'use client'

import { addCustomLink } from '@/app/actions/add-custom-link'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'
import Button from '../ui/button'
import Input from '../ui/input'
import { Modal } from '../ui/modal'

export function AddCustomLink() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingCustomLink, setIsSavingCustomLink] = useState(false)

  const { profileId } = useParams<{ profileId: string }>()

  const [link1, setLink1] = useState({
    title: '',
    url: '',
  })

  const [link2, setLink2] = useState({
    title: '',
    url: '',
  })
  const [link3, setLink3] = useState({
    title: '',
    url: '',
  })

  const router = useRouter()

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function handleSaveCustomLink() {
    setIsSavingCustomLink(true)

    await addCustomLink({
      link1,
      link2,
      link3,
      profileId: profileId,
    })

    startTransition(() => {
      setIsSavingCustomLink(false)
      handleCloseModal()
      router.refresh()
    })
  }

  return (
    <>
      <button
        type="button"
        className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
        onClick={handleOpenModal}
      >
        <Plus />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={handleCloseModal}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white text-xl font-bold">
            Adicionar links personalizados
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <p>Título do link</p>
                <Input
                  type="text"
                  placeholder="Digite o título"
                  value={link1.title}
                  onChange={e => setLink1({ ...link1, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold">Link</p>
                <Input
                  type="text"
                  placeholder="Inserir URL"
                  value={link1.url}
                  onChange={e => setLink1({ ...link1, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <p>Título do link</p>
                <Input
                  type="text"
                  placeholder="Digite o título"
                  value={link2.title}
                  onChange={e => setLink2({ ...link2, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold">Link</p>
                <Input
                  type="text"
                  placeholder="Inserir URL"
                  value={link2.url}
                  onChange={e => setLink2({ ...link2, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <p>Título do link</p>
                <Input
                  type="text"
                  placeholder="Digite o título"
                  value={link3.title}
                  onChange={e => setLink3({ ...link3, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold">Link</p>
                <Input
                  type="text"
                  placeholder="Inserir URL"
                  value={link3.url}
                  onChange={e => setLink3({ ...link3, url: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="font-bold text-white"
            >
              Voltar
            </button>

            <Button
              onClick={handleSaveCustomLink}
              disabled={isSavingCustomLink}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
