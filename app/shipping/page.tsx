import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Shipping notes for the minimal art storefront.",
};

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Shipping"
      title="Shipping Notes"
      intro="Orders are packed quietly and carefully, with flat works protected by archival tissue and reinforced board mailers."
      sections={[
        {
          heading: "Dispatch Schedule",
          body: "In-stock works typically leave the studio within three business days. Release days and framed shipments may require a longer handling window so the packing remains careful rather than rushed.",
        },
        {
          heading: "Packaging",
          body: "Printed matter and unframed works travel flat or rolled according to size. Oversized sheets are packed with rigid support and minimal branded material to keep the experience restrained.",
        },
        {
          heading: "International Orders",
          body: "International delivery is available for most unframed works. Any customs duties, taxes, or clearance charges are determined by the destination and remain the responsibility of the recipient.",
        },
      ]}
    />
  );
}
