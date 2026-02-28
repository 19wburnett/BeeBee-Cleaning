import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { InvoicePayload } from "@/types/invoice";
import {
  createDepositPaymentLink,
  computeInvoiceTotal,
} from "@/lib/stripe-payment-link";

export async function POST(request: Request) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as InvoicePayload;

    if (!body.lineItems?.length) {
      return NextResponse.json(
        { error: "At least one line item is required" },
        { status: 400 }
      );
    }

    const payload: InvoicePayload = {
      invoiceNumber: body.invoiceNumber || "INV-001",
      invoiceDate: body.invoiceDate || new Date().toISOString().slice(0, 10),
      dueDate: body.dueDate ?? body.invoiceDate ?? new Date().toISOString().slice(0, 10),
      customerName: body.customerName || "",
      customerEmail: body.customerEmail,
      customerAddress: body.customerAddress,
      lineItems: body.lineItems.map((item) => ({
        ...item,
        amount: item.quantity * item.unitPrice,
      })),
      taxRate: body.taxRate ?? 0,
      notes: body.notes,
    };

    const total = computeInvoiceTotal(payload);
    const result = await createDepositPaymentLink(payload);

    if (!result) {
      return NextResponse.json(
        { error: "Could not create payment link. Deposit must be at least $0.50, and Stripe must be configured." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      url: result.url,
      depositAmount: result.depositAmount,
      total,
    });
  } catch (error) {
    console.error("Payment link error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create payment link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
