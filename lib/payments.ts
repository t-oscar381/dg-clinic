/*
 * Payment gateway placeholder for a future release. The current site
 * is consultation-first: treatment enquiries and bookings happen over
 * WhatsApp, and no checkout is exposed.
 *
 * The interface below is kept stable so treatment CTAs can later move
 * from chat deep links to an online checkout without restructuring
 * the catalogue pages.
 */

export type PaymentProvider = "midtrans" | "xendit" | "none";

export const PAYMENTS_ENABLED = false;

export const PAYMENT_PROVIDER: PaymentProvider =
  (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER as PaymentProvider) || "none";

// Treatment ids match the `id` fields in each category page's
// TreatmentTabs data, so a future checkout can reference the same
// catalogue.
export interface CheckoutItem {
  treatmentId: string;
  treatmentName: string;
}

export async function startCheckout(item: CheckoutItem): Promise<never> {
  throw new Error(
    `Online payment is not available yet (requested: ${item.treatmentId}). ` +
      "Bookings are handled via WhatsApp."
  );
}
