import { z } from 'zod'

const envSchema = z.object({
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string().email(),

  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  AUTH_SECRET: z.string(),

  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),

  STRIPE_PRICE_ID: z.string(),
  STRIPE_SUBSCRIPTION_PRICE_ID: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_STRIPE_PUB_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
