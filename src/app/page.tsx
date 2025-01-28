import { Header } from '@/components/lading-page/header'
import Hero from '@/components/lading-page/hero'
import { Pricing } from '@/components/lading-page/pricing'
import { VideoExplanation } from '@/components/lading-page/video-explanation'
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      {/*
      
      <FAQ /> */}

      <Hero />
      <VideoExplanation />
      <Pricing />
    </div>
  )
}
