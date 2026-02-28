import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import InvoicePdfDocument from "@/components/admin/InvoicePdfDocument";
import type { InvoicePayload } from "@/types/invoice";
import {
  createDepositPaymentLink,
  createBalancePaymentLink,
} from "@/lib/stripe-payment-link";

async function getLogoDataUrl(): Promise<string | undefined> {
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.svg");
    const svgBuffer = fs.readFileSync(logoPath);
    const pngBuffer = await sharp(svgBuffer)
      .resize(320, 156)
      .png()
      .toBuffer();
    return `data:image/png;base64,${pngBuffer.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      dueDate: body.dueDate || body.invoiceDate || new Date().toISOString().slice(0, 10),
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

    const [logoDataUrl, depositResult, balanceResult] = await Promise.all([
      getLogoDataUrl(),
      createDepositPaymentLink(payload),
      createBalancePaymentLink(payload),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- react-pdf expects Document root type
    const pdfBuffer = await renderToBuffer(
      React.createElement(InvoicePdfDocument, {
        data: payload,
        logoDataUrl,
        depositLinkUrl: depositResult?.url,
        depositAmount: depositResult?.depositAmount,
        balanceLinkUrl: balanceResult?.url,
        balanceAmount: balanceResult?.balanceAmount,
      }) as any
    );

    const filename = `invoice-${payload.invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
