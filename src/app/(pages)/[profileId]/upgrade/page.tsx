import { Header } from '@/components/lading-page/header'
import type { Metadata } from 'next'
import { PlanButtons } from './plan-buttons'

export const metadata: Metadata = {
  title: 'ProjectInBio - Upgrade',
  description: 'ProjectInBio: Upgrade',
}

export default function UpgradePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />

      <h2 className="text-2xl font-bold">Escolha o plano</h2>

      <PlanButtons />
    </div>
  )
}
