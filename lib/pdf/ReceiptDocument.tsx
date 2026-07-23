import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import path from "path";
import type { SimulatedReceipt } from "@/lib/finance-simulator";
import { SITE_NAME } from "@/lib/site";

/*
 * Server-rendered receipt PDF. Deliberately NOT using the browser's
 * print engine (window.print / @media print) — different browsers and
 * OS print dialogs apply their own default margins/scaling on top of
 * our CSS, which is what caused the receipt to print off-center twice.
 * react-pdf computes the exact page layout itself, so the output is
 * byte-identical regardless of the client's browser or OS.
 */

const NAVY = "#1e3a5f";
const TEAL = "#4fbdae";
const TEAL_TINT = "#e6f5f2";
const GOLD_TINT = "#f6efdf";
const GOLD_TEXT = "#8a6a1f";
const BORDER = "#e4dfd3";
const INK = "#1a1a1a";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: INK,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 18,
  },
  logo: {
    width: 78,
    height: 40,
    objectFit: "contain",
  },
  title: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
  },
  meta: {
    fontSize: 8.5,
    color: "#666666",
    marginTop: 2,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: GOLD_TINT,
    color: GOLD_TEXT,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginBottom: 20,
  },
  rows: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 16,
    marginBottom: 20,
  },
  rowCol: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 7.5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#999999",
    marginBottom: 3,
  },
  rowValue: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
  },
  statusPaid: {
    color: TEAL,
  },
  table: {
    marginBottom: 20,
  },
  tableHeadRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingVertical: 6,
  },
  tableFootRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: NAVY,
    paddingTop: 8,
    marginTop: 2,
  },
  colItem: { flex: 2.4 },
  colQty: { flex: 0.8, textAlign: "right" },
  colPrice: { flex: 1.4, textAlign: "right" },
  colTotal: { flex: 1.4, textAlign: "right" },
  thText: {
    fontSize: 7.5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#999999",
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: NAVY,
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: NAVY,
  },
  footnote: {
    fontSize: 8,
    color: "#999999",
    lineHeight: 1.5,
  },
});

export function ReceiptDocument({ receipt }: { receipt: SimulatedReceipt }) {
  const logoPath = path.join(process.cwd(), "public", "logo", "Logo-pdf.png");
  const issuedDate = new Date(receipt.issuedAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document title={`${receipt.customerName} — ${receipt.receiptNo}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.head}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={logoPath} style={styles.logo} />
          <View>
            <Text style={styles.title}>Official Receipt</Text>
            <Text style={styles.meta}>{receipt.receiptNo}</Text>
          </View>
        </View>

        <Text style={styles.badge}>SIMULATED — NO REAL CHARGE</Text>

        <View style={styles.rows}>
          <View style={styles.rowCol}>
            <Text style={styles.rowLabel}>Billed To</Text>
            <Text style={styles.rowValue}>{receipt.customerName}</Text>
          </View>
          <View style={styles.rowCol}>
            <Text style={styles.rowLabel}>Issued</Text>
            <Text style={styles.rowValue}>{issuedDate}</Text>
          </View>
        </View>

        <View style={styles.rows}>
          <View style={styles.rowCol}>
            <Text style={styles.rowLabel}>Paid Via</Text>
            <Text style={styles.rowValue}>{receipt.provider}</Text>
          </View>
          <View style={styles.rowCol}>
            <Text style={styles.rowLabel}>Status</Text>
            <Text style={[styles.rowValue, styles.statusPaid]}>
              {receipt.status}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeadRow}>
            <Text style={[styles.thText, styles.colItem]}>Item</Text>
            <Text style={[styles.thText, styles.colQty]}>Qty</Text>
            <Text style={[styles.thText, styles.colPrice]}>Unit Price</Text>
            <Text style={[styles.thText, styles.colTotal]}>Total</Text>
          </View>
          {receipt.lines.map((line) => (
            <View style={styles.tableRow} key={line.name}>
              <Text style={styles.colItem}>{line.name}</Text>
              <Text style={styles.colQty}>{line.qty}</Text>
              <Text style={styles.colPrice}>
                Rp {line.unitPriceIdr.toLocaleString("id-ID")}
              </Text>
              <Text style={styles.colTotal}>
                Rp {line.lineTotalIdr.toLocaleString("id-ID")}
              </Text>
            </View>
          ))}
          <View style={styles.tableFootRow}>
            <Text style={[styles.colItem, styles.totalLabel]}>Total</Text>
            <View style={styles.colQty} />
            <View style={styles.colPrice} />
            <Text style={[styles.colTotal, styles.totalValue]}>
              {receipt.totalDisplay}
            </Text>
          </View>
        </View>

        <Text style={styles.footnote}>
          {SITE_NAME} · This is a simulated receipt generated for internal
          testing. No payment was actually processed.
        </Text>
      </Page>
    </Document>
  );
}
