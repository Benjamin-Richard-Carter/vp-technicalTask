import { DelimitedArrayParam, useQueryParams } from 'use-query-params';
import { Facet, FacetValue } from '../types/listings';
import { valueRangeSchema } from '../schemas/facets';
import { queryParams } from '../api/fetchListings';

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

    const addValue = (values: (string | null)[], newValue: string) => {
      if (values.includes(newValue)) {
        return values;
      }

      return [...values, newValue];
    };

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

  const getAllFacetValues = () => {
    const queryArray = Object.entries(query);
    const activeCategories = queryArray.filter(
      ([, value]) => value !== undefined
    );

    const activeValues = activeCategories.map(([key]) => {
      const facet = facets.find((facet) => facet.identifier === key);
      const facetOptionArray = getFacetValues(key).map((value) => {
        if (!facet) return null;

        return facet.options.find(
          (o) => JSON.stringify(o.value) === JSON.stringify(value)
        );
      });

      return { facet, selectedOptions: facetOptionArray };
    });

    return activeValues.filter((v) => v !== null);
  };

  const getQueryValues = (): queryParams['facets'] => {
    const activeFacets = getAllFacetValues();
    const queryValues = activeFacets.reduce((acc, facet) => {
      const identifier = facet.facet?.identifier;

      if (!identifier) return acc;

      (acc ?? {})[identifier] = facet.selectedOptions
        .filter((item) => item !== null && item !== undefined)
        .map((item) => ({
          identifier: item.identifier,
          value: item.value,
        }));

      return acc ?? {};
    }, {} as queryParams['facets']);

    return queryValues;
  };

  const clearAllFacetValues = () => {
    const clearedQuery = Object.fromEntries(
      Object.keys(query).map((key) => [key, undefined])
    );
    setQuery(clearedQuery);
  };

  return {
    updateParams,
    clearParams,
    getFacetValues,
    getQueryValues,
    clearAllFacetValues,
    getAllFacetValues,
    query,
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
