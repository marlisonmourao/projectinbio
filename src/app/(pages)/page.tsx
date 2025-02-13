import { FAQ } from '@/components/lading-page/faq'
import { Header } from '@/components/lading-page/header'
import Hero from '@/components/lading-page/hero'
import { Pricing } from '@/components/lading-page/pricing'
import { VideoExplanation } from '@/components/lading-page/video-explanation'
import { getSEOTags } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = getSEOTags({
  appName: 'ProjectInBio',
  appDescription:
    'Project In Bio - Seus projetos e redes socias em um unico link',
  keywords: ['ProjectInBio', 'Redes Sociais', 'Projetos'],
  appDomain: 'https://projectinbio.com',
  canonicalUrlRelative: '/',
})

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />

      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  )
}
