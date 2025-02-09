'use client'

import { createProject } from '@/app/actions/create-project'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import TextArea from '@/components/ui/text-area'
import { compressFile, handleImageInput, triggerImageInput } from '@/lib/utils'
import { ArrowUpFromLine, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

export function NewProjects({ profileId }: { profileId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [projectImage, setProjectImage] = useState<string | null>(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  const router = useRouter()

  async function handleCreateProject() {
    setIsCreatingProject(true)

    const imageInput = document.getElementById('imageInput') as HTMLInputElement

    if (!imageInput.files) {
      setIsCreatingProject(false)
      return
    }

    const compressedImage = await compressFile(Array.from(imageInput.files))

    const formData = new FormData()

    formData.append('file', compressedImage[0])
    formData.append('profileId', profileId)
    formData.append('projectName', projectName)
    formData.append('projectDescription', projectDescription)
    formData.append('projectUrl', projectUrl)

    await createProject(formData)

    startTransition(() => {
      setIsOpen(false)
      setProjectName('')
      setProjectDescription('')
      setProjectUrl('')
      setProjectImage(null)
      setIsCreatingProject(false)

      router.refresh()
    })
  }
  return (
    <>
      <button
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="size-10 text-accent-green" />
        <span className="text-accent-green">Novo projeto</span>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col gap-10 justify-between">
          <p className="text-white font-bold text-xl">Novo projeto</p>

          <div className="flex gap-10">
            <div className="flex flex-col gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Imagem do projeto"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput('imageInput')}
                    className="w-full h-full"
                    type="button"
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                type="button"
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput('imageInput')}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                placeholder="Nome do projeto"
                className="hidden"
                onChange={e => setProjectImage(handleImageInput(e))}
              />
            </div>

            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Título do projeto
                </label>

                <Input
                  id="project-name"
                  placeholder="Digit o nome do projeto"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>

                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição sobre o projeto"
                  className="h-36"
                  value={projectDescription}
                  onChange={e => setProjectDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>

                <Input
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={e => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="font-bold text-white"
              type="button"
            >
              Voltar
            </button>

            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
