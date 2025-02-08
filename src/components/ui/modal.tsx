'use client'

import useClickOutside from '@/hooks/use-click-outside'
import { useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => setIsOpen(false))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-50">
      <div ref={modalRef}>{children}</div>
    </div>
  )
}
