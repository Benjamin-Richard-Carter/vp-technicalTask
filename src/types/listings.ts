export type Listings = {
  pagination: Pagination;
  facets: Facet[];
  products: Product[];
};

export type Facet = {
  identifier: string;
  displayName: string;
  priority: number;
  options: FacetOption[];
  facetType: number;
};

export type FacetOption = {
  identifier: string;
  displayValue: string;
  productCount: number;
  priority: number;
  value: FacetValue;
};

export type FacetValue = boolean | ValueRange | string;

export type ValueRange = {
  gte: number;
  lte?: number;
};

export type Pagination = {
  from: number;
  size: number;
  total: number;
  sortType: number;
};

export type Product = {
  id: string;
  legacyId?: string;
  legacyVariantId?: string;
  cultureCode: string;
  isDefaultVariant: boolean;
  sku: string;
  productName: string;
  slug: string;
  averageRating?: number;
  reviewsCount: number;
  questionsCount: number;
  image: Image;
  stockStatus: StockStatus;
  price: Price;
  attributes: { [key: string]: boolean };
  defaultCategory: DefaultCategory;
  brand: Brand;
  score: number;
};

export type Brand = {
  externalId: string;
  slug: string;
  name: string;
  brandImage?: Image;
  depth?: number;
};

export type Image = {
  externalId: string;
  url: string;
  priority: number;
  isDefault: boolean;
  attributes: {
    imageAltText: string;
  };
};

export type DefaultCategory = {
  externalId: string;
  slug: string;
  name: string;
  isDefault: boolean;
  ancestors: Brand[];
};

export type Price = {
  currencyCode: string;
  wasPriceIncTax?: number;
  wasPriceExcTax?: number;
  priceIncTax: number;
  priceExcTax: number;
  isOnPromotion: boolean;
  monthlyFinanceEstimate?: number;
  discountPercentage?: number;
};

export type StockStatus = {
  status: string;
};
