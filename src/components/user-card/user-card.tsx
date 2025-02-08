import Button from '@/components/ui/button'
import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import { EditSocialLinks } from './edit-social-links'

export default function UserCard() {
  const icons = [Github, Instagram, Linkedin, Twitter]

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48 ">
        <img
          src="https://github.com/marlisonmourao.png"
          alt=""
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <span className="text-3xl font-bold min-w-0 overflow-x-hidden">
            Marlison Mourão
          </span>
        </div>

        <p className="opacity-40">"Eu faço produtos para a internet"</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>

        <div className="flex gap-3">
          {icons.map((Icon, index) => (
            <button
              key={index.toString()}
              type="button"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Icon />
            </button>
          ))}

          <EditSocialLinks />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full h-44">
        <div className="w-full flex flex-col items-center gap-3">
          <Button className="w-full">Template SaaS - Compre agora</Button>

          <button
            type="button"
            className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  )
}
