import { env } from '@/env'
import { db } from '@/lib/firebase'
import { stripe } from '@/lib/stripe'
import { type NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    const signature = req.headers.get('stripe-signature')

    const secret = env.STRIPE_WEBHOOK_SECRET

    if (!signature || !secret) {
      throw new Error('Strip Webhook secret is not set.')
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    switch (event.type) {
      case 'checkout.session.completed':
        if (event.data.object.payment_status === 'paid') {
          const userId = event.data.object.client_reference_id
          if (userId) {
            await db.collection('users').doc(userId).update({
              isSubscribed: true,
            })
          }
        }

        if (
          event.data.object.payment_status === 'unpaid' &&
          event.data.object.payment_intent
        ) {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            event.data.object.payment_intent.toString()
          )

          const hostVoucherUrl =
            paymentIntent.next_action?.boleto_display_details
              ?.hosted_voucher_url

          if (hostVoucherUrl) {
            const userEmail = event.data.object.customer_details?.email
            console.log('Enviar boleto para o cliente.', userEmail)
          }
        }
        break
      case 'checkout.session.async_payment_succeeded':
        if (event.data.object.payment_status === 'paid') {
          const userId = event.data.object.client_reference_id
          if (userId) {
            await db.collection('users').doc(userId).update({
              isSubscribed: true,
            })
          }
        }
        break
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const customerId = subscription.customer as string
        if (customerId) {
          const customer = (await stripe.customers.retrieve(
            customerId
          )) as Stripe.Customer

          if (customer?.metadata.userId) {
            const userId = customer.metadata.userId
            await db.collection('users').doc(userId).update({
              isSubscribed: false,
            })
          }
        }
        break
      }
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(null, { status: 500 })
  }
}
