import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { InvoicePayload } from "@/types/invoice";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
  },
  header: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 80,
    height: 40,
    objectFit: "contain",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 80,
    color: "#666",
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    padding: 8,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  colDesc: { flex: 2 },
  colQty: { width: 50 },
  colPrice: { width: 70 },
  colAmount: { width: 80 },
  totals: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    width: 200,
    marginBottom: 4,
  },
  totalLabel: {
    flex: 1,
  },
  totalValue: {
    width: 80,
    textAlign: "right",
  },
  notes: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    color: "#666",
    fontSize: 9,
  },
  paymentLink: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  paymentLinkTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
  },
  paymentLinkText: {
    fontSize: 10,
    color: "#333",
    marginBottom: 4,
  },
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

interface InvoicePdfDocumentProps {
  data: InvoicePayload;
  logoDataUrl?: string;
  depositLinkUrl?: string;
  depositAmount?: number;
  balanceLinkUrl?: string;
  balanceAmount?: number;
}

export default function InvoicePdfDocument({
  data,
  logoDataUrl,
  depositLinkUrl,
  depositAmount,
  balanceLinkUrl,
  balanceAmount,
}: InvoicePdfDocumentProps) {
  const subtotal = data.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = data.taxRate ? subtotal * data.taxRate : 0;
  const total = subtotal + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoDataUrl && (
            <Image src={logoDataUrl} style={styles.logo} />
          )}
          <View style={styles.headerText}>
            <Text style={styles.title}>BeeBee Cleaning</Text>
            <Text style={styles.subtitle}>Professional Cleaning Services</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text>{data.customerName}</Text>
            {data.customerEmail && <Text>{data.customerEmail}</Text>}
            {data.customerAddress && <Text>{data.customerAddress}</Text>}
          </View>
          <View style={[styles.section, { minWidth: 180, flexShrink: 0 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>Invoice #</Text>
              <Text style={styles.value}>{data.invoiceNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{formatDate(data.invoiceDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>{formatDate(data.dueDate)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Unit Price</Text>
            <Text style={styles.colAmount}>Amount</Text>
          </View>
          {data.lineItems.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.unitPrice)}</Text>
              <Text style={styles.colAmount}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
          </View>
          {data.taxRate != null && data.taxRate > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Tax ({(data.taxRate * 100).toFixed(0)}%)
              </Text>
              <Text style={styles.totalValue}>{formatCurrency(taxAmount)}</Text>
            </View>
          )}
          <View style={[styles.totalRow, { marginTop: 8 }]}>
            <Text style={[styles.totalLabel, { fontWeight: "bold" }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { fontWeight: "bold" }]}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>

        {data.notes && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        )}

        {(depositLinkUrl || balanceLinkUrl) && (
          <View style={styles.paymentLink}>
            <Text style={styles.paymentLinkTitle}>Pay Online</Text>
            {depositLinkUrl && depositAmount != null && (
              <>
                <Text style={styles.paymentLinkText}>
                  50% deposit ({formatCurrency(depositAmount)}) due at acceptance:
                </Text>
                <Link
                  src={depositLinkUrl}
                  style={{ color: "#2563eb", fontSize: 10, marginBottom: 8 }}
                >
                  {depositLinkUrl}
                </Link>
              </>
            )}
            {balanceLinkUrl && balanceAmount != null && (
              <>
                <Text style={styles.paymentLinkText}>
                  Balance ({formatCurrency(balanceAmount)}) due after service:
                </Text>
                <Link
                  src={balanceLinkUrl}
                  style={{ color: "#2563eb", fontSize: 10 }}
                >
                  {balanceLinkUrl}
                </Link>
              </>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}
