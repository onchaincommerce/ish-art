export type CollectionSlug = "catalogues" | "prints" | "original-drawings";

export type ProductStatus = "available" | "sold";

export type ArtworkVariant =
  | "field"
  | "grid"
  | "line"
  | "wash"
  | "arch"
  | "dots"
  | "portrait";

export type ArtworkAspect = "portrait" | "square" | "landscape";

export interface ArtworkSpec {
  aspect: ArtworkAspect;
  variant: ArtworkVariant;
  base: string;
  tone: string;
  accent: string;
  mark: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  artistLine: string;
  collection: CollectionSlug;
  price: number;
  status: ProductStatus;
  description: string;
  shippingDetails: string;
  availabilityNote: string;
  filters: string[];
  specs: ProductSpec[];
  artwork: ArtworkSpec;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface CollectionDefinition {
  slug: CollectionSlug;
  href: string;
  navLabel: string;
  title: string;
  intro: string;
  notes?: ProductSpec[];
  filterOptions?: FilterOption[];
  paginationLabel: string;
  seoTitle: string;
  seoDescription: string;
  soldPresentation?: "badge" | "plain";
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface AboutPageContent {
  title: string;
  biography: string;
  instagramLabel: string;
  instagramHref: string;
  portrait: ArtworkSpec;
}

export interface CartItem {
  slug: string;
  title: string;
  artistLine: string;
  price: number;
  artwork: ArtworkSpec;
  quantity: number;
}
