import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notes for the minimal art storefront.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Privacy Notice"
      intro="This placeholder storefront keeps the legal language simple and minimal. In a production shop, this page would be replaced with the studio's final privacy policy."
      sections={[
        {
          heading: "Order Information",
          body: "Basic order details such as name, delivery address, and contact email would be used to fulfill purchases, answer questions, and manage dispatch communication.",
        },
        {
          heading: "Site Usage",
          body: "Anonymous analytics or performance data may be reviewed to understand page speed, navigation patterns, and product interest. Sensitive personal profiling is not part of this placeholder implementation.",
        },
        {
          heading: "Requests",
          body: "If a production version of the site stores personal data, visitors should have a clear way to ask for access, correction, or deletion according to the applicable rules in the launch market.",
        },
      ]}
    />
  );
}
