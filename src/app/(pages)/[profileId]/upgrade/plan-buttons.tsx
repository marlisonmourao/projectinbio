'use client'

import Button from '@/components/ui/button'
import { useStripe } from '@/hooks/use-stripe'
import { useParams } from 'next/navigation'

export function PlanButtons() {
  const { createStripeCheckout } = useStripe()

  const { profileId } = useParams<{ profileId: string }>()

  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={() =>
          createStripeCheckout({
            isSubscription: true,
            metadata: { profileId },
          })
        }
      >
        R$ 9,90/mês
      </Button>
      <Button
        onClick={() =>
          createStripeCheckout({
            isSubscription: false,
            metadata: { profileId },
          })
        }
      >
        R$ 99,90/vitalício{' '}
      </Button>
    </div>
  )
}
