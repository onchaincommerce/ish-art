import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Returns",
  description: "Returns guidance for the minimal art storefront.",
};

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Returns"
      title="Returns & Condition"
      intro="Each work is checked before leaving the studio. If something arrives with damage in transit, contact the studio promptly so the issue can be reviewed."
      sections={[
        {
          heading: "Condition Reports",
          body: "Original works and editions are described as accurately as possible in the product listing. Small variations in paper tone, deckled edges, or hand-finished marks are part of the object rather than defects.",
        },
        {
          heading: "Damaged Deliveries",
          body: "If an order arrives damaged, retain the packaging and send photographs of the parcel and artwork within five days of delivery. A replacement, repair, or refund can be discussed from there.",
        },
        {
          heading: "Change of Mind",
          body: "Because many works are issued in small runs or as one-off originals, discretionary returns are handled case by case. Contact the studio before sending anything back.",
        },
      ]}
    />
  );
}
