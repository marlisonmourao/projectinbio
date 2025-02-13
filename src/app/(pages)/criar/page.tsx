import { Header } from '@/components/lading-page/header'
import { Rocket } from 'lucide-react'
import type { Metadata } from 'next'
import { CreateLinkForm } from './create-link-form'

export const metadata: Metadata = {
  title: 'ProjectInBio - Criar',
  description: 'ProjectInBio: Criar',
}

export default function Criar() {
  return (
    <div>
      <Header />

      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>

        <CreateLinkForm />
      </div>
    </div>
  )
}
