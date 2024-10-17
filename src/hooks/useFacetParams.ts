import { DelimitedArrayParam, useQueryParams } from 'use-query-params';
import { Facet, FacetValue } from '../types/listings';
import { valueRangeSchema } from '../schemas/facets';

export const useFacetParams = (facets: Facet[]) => {
  const identifiers = facets.map((facet) => facet.identifier);

  const paramConfig = Object.fromEntries(
    identifiers.map((identifier) => [identifier, DelimitedArrayParam])
  );

  const [query, setQuery] = useQueryParams(paramConfig);

  const updateParams = (
    identifier: string,
    value: FacetValue,
    checked: boolean
  ) => {
    const currentValues = query[identifier] || [];
    const encodedValue = encodeFacet(value);

    const addValue = (values: (string | null)[], newValue: string) => [
      ...values,
      newValue,
    ];

    const removeValue = (values: (string | null)[], valueToRemove: string) =>
      values.filter((item) => item !== valueToRemove);

    if (typeof encodedValue === 'undefined') {
      return;
    }

    const newValues = checked
      ? addValue(currentValues, encodedValue)
      : removeValue(currentValues, encodedValue);

    if (newValues.length === 0) {
      setQuery({ [identifier]: undefined });
    } else {
      setQuery({ [identifier]: newValues });
    }
  };

  const clearParams = (identifier: string) => {
    setQuery({ [identifier]: undefined });
  };

  const getFacetValues = (identifier: string): (FacetValue | null)[] =>
    query[identifier]?.map(decodeFacet) ?? [];

  const getAllFacetValues = () =>
    Object.fromEntries(
      Object.entries(query).map(([key, value]) => [
        key,
        value?.map(decodeFacet),
      ])
    );

  const clearAllFacetValues = () => {
    setQuery({});
  };

  return {
    updateParams,
    clearParams,
    getFacetValues,
    getAllFacetValues,
    clearAllFacetValues,
  };
};

////////////////////////////////////////
// ENCODE URI STRING ///////////////////
////////////////////////////////////////

const encodeFacet = (value: FacetValue) => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (valueRangeSchema.safeParse(value).success) {
    if (!value.lte) {
      return `range${value.gte}`;
    }

    return `range${value.gte}-${value.lte}`;
  }

  return undefined;
};

////////////////////////////////////////
// DECODE URI STRING ///////////////////
////////////////////////////////////////

const decodeFacet = (value: string | null): FacetValue | null => {
  if (value === null || value === '') {
    return null;
  }

  if (value === 'true') {
    return true;
  }

  if (value.startsWith('range')) {
    const [gte, lte] = value
      .replace('range', '')
      .split('-')
      .map((val) => parseInt(val, 10));

    if (valueRangeSchema.safeParse({ gte, lte }).error) {
      return null;
    }

    if (isNaN(lte)) {
      return { gte };
    }

    return { gte, lte };
  }

  return value;
};
