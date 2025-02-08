'use client'

import { createLink } from '@/app/actions/create-link'
import { verifyLink } from '@/app/actions/verify-link'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { sanitizeLink } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type FormEvent, useState } from 'react'

export function CreateLinkForm() {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value))

    setError('')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (link.length === 0) {
      setError('Escolha um link para continuar.')
      return
    }

    const isLinkToken = await verifyLink(link)

    if (isLinkToken) {
      setError('Desculpe, este link já está em uso.')
      return
    }

    const isLinkCreated = await createLink(link)

    if (!isLinkCreated) {
      setError('Erro ao criar link. Tente novamente mais tarde.')
      return
    }

    router.push(`/${link}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
        <span className="text-white">projectinbio.com/</span>

        <Input onChange={handleLinkChange} value={link} />
        <Button className="w-[126px]">Criar</Button>
      </form>

      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  )
}
