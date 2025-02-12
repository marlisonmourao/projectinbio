'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Button from './button'
import Input from './input'

export function CreateNow() {
  const [link, setLink] = useState('')

  return (
    <div className="flex items-center gap-2 w-full mt-[10vh]">
      <span className="text-white text-xl">projectinbio.com/</span>

      <Input placeholder="seu link" onChange={e => setLink(e.target.value)} />
      <Button
        type="button"
        onClick={() => {
          signIn('google', {
            redirectTo: `/criar?link=${link}`,
          })
        }}
      >
        Criar agora
      </Button>
    </div>
  )
}
