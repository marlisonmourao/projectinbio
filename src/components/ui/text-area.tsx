import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface TextAreaProps extends ComponentProps<'textarea'> {
  variant?: 'primary' | 'secondary'
}

export default function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={cn(
        'w-full p-3 bg-background-secondary text-white placeholder:text-content-placeholder rounded-xl border border-transparent hover:border-border-secondary hover:text-content-body active:border-border-tertiary',
        rest.className
      )}
    />
  )
}
