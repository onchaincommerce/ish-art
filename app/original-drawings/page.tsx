import type { Metadata } from "next";

import { CollectionPage } from "@/components/collection-page";
import { collections } from "@/data/store";
import { getPageNumber, getSingleParam } from "@/lib/page-helpers";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const collection = collections["original-drawings"];

export const metadata: Metadata = {
  title: collection.seoTitle,
  description: collection.seoDescription,
};

export default async function OriginalDrawingsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};

  return (
    <CollectionPage
      slug="original-drawings"
      page={getPageNumber(params.page)}
      filter={getSingleParam(params.filter, "all")}
    />
  );
}
