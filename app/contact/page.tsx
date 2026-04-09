import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for the minimal art storefront.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Studio Contact"
      intro="For framing questions, edition notes, or availability checks, use the contact details below as a placeholder for a studio inbox."
      sections={[
        {
          heading: "General Inquiries",
          body: "Email studio@ishart.example for questions about editions, works on paper, and printed matter. Messages are typically answered within two business days.",
        },
        {
          heading: "Press & Projects",
          body: "For publication requests, exhibitions, or collaborative projects, write with a concise overview and any practical dates so the response can stay focused.",
        },
        {
          heading: "Framing & Reserves",
          body: "If you need a framing quote, condition notes, or a short reserve request on an available work, include the product title in your message.",
        },
      ]}
    />
  );
}
