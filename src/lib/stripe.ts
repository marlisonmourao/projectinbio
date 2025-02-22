import { env } from '@/env'
import Striper from 'stripe'

const stripe = new Striper(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
})

export { stripe }
