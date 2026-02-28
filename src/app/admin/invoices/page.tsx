"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  FileDown,
  Lock,
  Loader2,
  Link2,
  Copy,
  Check,
} from "lucide-react";
import type { InvoicePayload, LineItem } from "@/types/invoice";

const defaultLineItem: LineItem = {
  description: "",
  quantity: 1,
  unitPrice: 0,
  amount: 0,
};

function computeAmount(qty: number, unitPrice: number): number {
  return Math.round(qty * unitPrice * 100) / 100;
}

export default function AdminInvoicesPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    () => new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState(
    () =>
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { ...defaultLineItem },
  ]);
  const [taxRate, setTaxRate] = useState("");
  const [notes, setNotes] = useState("");

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");

  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [paymentLinkLoading, setPaymentLinkLoading] = useState(false);
  const [paymentLinkError, setPaymentLinkError] = useState("");
  const [paymentLinkAmount, setPaymentLinkAmount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/verify")
      .then((r) => r.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setAuthError(data.error || "Invalid password");
      }
    } catch {
      setAuthError("Request failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const addLineItem = () => {
    setLineItems((prev) => [...prev, { ...defaultLineItem }]);
  };

  const removeLineItem = (idx: number) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateLineItem = (
    idx: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    setLineItems((prev) => {
      const next = [...prev];
      const item = { ...next[idx], [field]: value };
      if (field === "quantity" || field === "unitPrice") {
        item.amount = computeAmount(
          field === "quantity" ? (value as number) : item.quantity,
          field === "unitPrice" ? (value as number) : item.unitPrice
        );
      }
      next[idx] = item;
      return next;
    });
  };

  const buildPayload = (): InvoicePayload => {
    return {
      invoiceNumber: invoiceNumber || "INV-001",
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      customerName: customerName,
      customerEmail: customerEmail || undefined,
      customerAddress: customerAddress || undefined,
      lineItems: lineItems.map((item) => ({
        ...item,
        amount: computeAmount(item.quantity, item.unitPrice),
      })),
      taxRate: taxRate ? parseFloat(taxRate) / 100 : undefined,
      notes: notes || undefined,
    };
  };

  const handleGeneratePdf = async () => {
    const payload = buildPayload();
    const validItems = payload.lineItems.filter(
      (i) => i.description.trim() && (i.quantity > 0 || i.unitPrice > 0)
    );
    if (validItems.length === 0) {
      setPdfError("Add at least one line item with description and price.");
      return;
    }
    payload.lineItems = validItems;

    setPdfError("");
    setPdfLoading(true);
    try {
      const res = await fetch("/api/admin/invoice/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to generate PDF");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${payload.invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "Failed to generate PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleCreatePaymentLink = async () => {
    const payload = buildPayload();
    const validItems = payload.lineItems.filter(
      (i) => i.description.trim() && (i.quantity > 0 || i.unitPrice > 0)
    );
    if (validItems.length === 0) {
      setPaymentLinkError("Add at least one line item with description and price.");
      return;
    }
    payload.lineItems = validItems;

    setPaymentLinkError("");
    setPaymentLink(null);
    setPaymentLinkAmount(null);
    setPaymentLinkLoading(true);
    try {
      const res = await fetch("/api/admin/invoice/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment link");
      setPaymentLink(data.url);
      setPaymentLinkAmount(data.depositAmount);
    } catch (err) {
      setPaymentLinkError(
        err instanceof Error ? err.message : "Failed to create payment link"
      );
    } finally {
      setPaymentLinkLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!paymentLink) return;
    await navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-beebee-yellow" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-beebee-yellow/20">
              <Lock className="h-6 w-6 text-beebee-yellow" />
            </div>
            <h2 className="text-xl font-bold">Admin Access</h2>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            {authError && (
              <p className="text-sm text-red-600 dark:text-red-400">{authError}</p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-md font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create Invoice</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter invoice details and line items, then download the PDF.
        </p>
      </div>

      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Invoice #</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Customer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
                placeholder="Customer name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
                placeholder="customer@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
                placeholder="Street, City, State, ZIP"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Line Items</h3>
            <button
              type="button"
              onClick={addLineItem}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-beebee-yellow text-black font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Add Row
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium">Description</th>
                  <th className="text-right py-3 px-2 font-medium w-24">Qty</th>
                  <th className="text-right py-3 px-2 font-medium w-32">
                    Unit Price
                  </th>
                  <th className="text-right py-3 px-2 font-medium w-32">Amount</th>
                  <th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateLineItem(idx, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-1 focus:ring-beebee-yellow"
                        placeholder="Service description"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          updateLineItem(
                            idx,
                            "quantity",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-right focus:outline-none focus:ring-1 focus:ring-beebee-yellow"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice || ""}
                        onChange={(e) =>
                          updateLineItem(
                            idx,
                            "unitPrice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-right focus:outline-none focus:ring-1 focus:ring-beebee-yellow"
                      />
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">
                      ${computeAmount(item.quantity, item.unitPrice).toFixed(2)}
                    </td>
                    <td className="py-2 px-1">
                      <button
                        type="button"
                        onClick={() => removeLineItem(idx)}
                        disabled={lineItems.length <= 1}
                        className="p-2 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow"
              placeholder="e.g. 8"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-beebee-yellow resize-none"
            placeholder="Payment terms, additional notes..."
          />
        </div>

        {pdfError && (
          <p className="text-sm text-red-600 dark:text-red-400">{pdfError}</p>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleGeneratePdf}
            disabled={pdfLoading}
            className="flex items-center gap-2 px-6 py-3 bg-beebee-yellow text-black font-bold rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {pdfLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <FileDown className="h-5 w-5" />
            )}
            {pdfLoading ? "Generating..." : "Download PDF"}
          </button>
          <button
            onClick={handleCreatePaymentLink}
            disabled={paymentLinkLoading}
            className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {paymentLinkLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Link2 className="h-5 w-5" />
            )}
            {paymentLinkLoading ? "Creating..." : "Create payment link (50% deposit)"}
          </button>
        </div>

        {paymentLinkError && (
          <p className="text-sm text-red-600 dark:text-red-400">{paymentLinkError}</p>
        )}

        {paymentLink && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-[#0a0a0a] space-y-2">
            <p className="text-sm font-medium">
              50% deposit: ${paymentLinkAmount?.toFixed(2)} — share this link with your customer to pay
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={paymentLink}
                className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-sm font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-beebee-yellow text-black font-medium hover:opacity-90 transition-opacity"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
