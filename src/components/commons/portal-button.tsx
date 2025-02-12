'use client'

import { useStripe } from '@/hooks/use-stripe'

export function PortalButton() {
  const { handleCrateStripePortal } = useStripe()

  return (
    <button onClick={handleCrateStripePortal} type="button">
      Portal
    </button>
  )
}
