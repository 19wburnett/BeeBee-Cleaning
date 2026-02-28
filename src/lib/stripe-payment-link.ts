import Stripe from "stripe";
import type { InvoicePayload } from "@/types/invoice";

const DEPOSIT_PERCENTAGE = 0.5;

export function computeInvoiceTotal(payload: InvoicePayload): number {
  const subtotal = payload.lineItems.reduce((sum, i) => sum + i.amount, 0);
  const taxAmount = payload.taxRate ? subtotal * payload.taxRate : 0;
  return subtotal + taxAmount;
}

export async function createDepositPaymentLink(
  payload: InvoicePayload
): Promise<{ url: string; depositAmount: number } | null> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  const total = computeInvoiceTotal(payload);
  const depositAmountCents = Math.round(total * DEPOSIT_PERCENTAGE * 100);
  if (depositAmountCents < 50) return null;

  const stripe = new Stripe(secretKey);
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://beebeecleaningservices.com";

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: depositAmountCents,
          product_data: {
            name: `50% Deposit - Invoice ${payload.invoiceNumber}`,
            description: `BeeBee Cleaning - Deposit for ${payload.customerName}. Balance due after service.`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      invoice_number: payload.invoiceNumber,
      customer_name: payload.customerName,
      type: "deposit",
    },
    after_completion: {
      type: "redirect",
      redirect: { url: `${baseUrl}/contact?paid=1` },
    },
  });

  return {
    url: paymentLink.url!,
    depositAmount: depositAmountCents / 100,
  };
}

export async function createBalancePaymentLink(
  payload: InvoicePayload
): Promise<{ url: string; balanceAmount: number } | null> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  const total = computeInvoiceTotal(payload);
  const balanceAmountCents = Math.round(total * (1 - DEPOSIT_PERCENTAGE) * 100);
  if (balanceAmountCents < 50) return null;

  const stripe = new Stripe(secretKey);
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://beebeecleaningservices.com";

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: balanceAmountCents,
          product_data: {
            name: `Balance Due - Invoice ${payload.invoiceNumber}`,
            description: `BeeBee Cleaning - Remaining balance for ${payload.customerName}. Due after service.`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      invoice_number: payload.invoiceNumber,
      customer_name: payload.customerName,
      type: "balance",
    },
    after_completion: {
      type: "redirect",
      redirect: { url: `${baseUrl}/contact?paid=1` },
    },
  });

  return {
    url: paymentLink.url!,
    balanceAmount: balanceAmountCents / 100,
  };
}
