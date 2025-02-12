import { env } from '@/env'
import { type Stripe, loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUB_KEY)
      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createStripeCheckout({
    metadata,
    isSubscription,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  }: { metadata: any; isSubscription: boolean }) {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ metadata, isSubscription }),
      })

      const data = await response.json()

      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCrateStripePortal() {
    const response = await fetch('/api/stripe/create-portal', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const data = await response.json()

    window.location.href = data.url
  }

  return {
    createStripeCheckout,
    handleCrateStripePortal,
  }
}
