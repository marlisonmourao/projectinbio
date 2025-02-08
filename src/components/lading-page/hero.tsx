import Input from '@/components/ui/input'
import UserCard from '@/components/user-card/user-card'
import { ProjectCard } from '../commons/project-card'
import { TotalVisits } from '../commons/total-visits'
import Button from '../ui/button'

export default function Hero() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col gap-2 w-full mt-[35vh]">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          Seus projetos e redes <br /> sociais em um único link
        </h1>

        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe ele com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>

        <div className="flex items-center gap-2 w-full mt-[10vh]">
          <span className="text-white text-xl">projectinbio.com</span>

          <Input placeholder="seu link" />
          <Button type="button">Criar agora</Button>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard />

          <div className="absolute -bottom-[7%] -right-[45%]">
            <TotalVisits />
          </div>

          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard />
          </div>

          <div className="absolute -top-[5%] -left-[55%] -z-10">
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  )
}
