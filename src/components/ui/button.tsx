import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({ variant = 'primary', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70',
        variant === 'primary' && 'bg-accent-purple',
        variant === 'secondary' && 'bg-background-tertiary',
        variant === 'ghost' && 'border-border-primary',
        rest.className
      )}
    >
      {rest.children}
    </button>
  )
}
