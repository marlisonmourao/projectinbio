import { Header } from '@/components/lading-page/header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Rocket } from 'lucide-react'

export default function Criar() {
  return (
    <div>
      <Header />

      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>

        <form className="flex items-center w-full gap-2">
          <span className="text-white">projectinbio.com/</span>

          <Input />
          <Button className="w-[126px]">Criar</Button>
        </form>

        <div>
          <span className="text-accent-pink">Erro de exemplo</span>
        </div>
      </div>
    </div>
  )
}
