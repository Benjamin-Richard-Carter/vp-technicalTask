import { useFacetParams } from '../hooks/useFacetParams';
import { valueRangeSchema, valueRangeArraySchema } from '../schemas/facets';
import { Facet, FacetValue } from '../types/listings';

type UseFacetParamsReturn = ReturnType<typeof useFacetParams>;

type FacetCardProps = {
  facet: Facet;
  clearParams: UseFacetParamsReturn['clearParams'];
  getFacetValues: UseFacetParamsReturn['getFacetValues'];
  updateParams: UseFacetParamsReturn['updateParams'];
};

export const FacetCard = ({
  facet,
  clearParams,
  getFacetValues,
  updateParams,
}: FacetCardProps) => {
  const { identifier, displayName, options } = facet;
  const facetValues = getFacetValues(identifier);
  const optionValues = options.map((option) => option.value);
  const isValueRange = valueRangeArraySchema.safeParse(optionValues).success;

  const isChecked = (value: FacetValue) => {
    if (!facetValues) {
      return false;
    }

    if (!isValueRange) {
      return facetValues.includes(value);
    }

    if (isValueRange) {
      const range = valueRangeSchema.safeParse(value);
      if (range.success) {
        return facetValues.some(
          (dv) =>
            valueRangeSchema.parse(dv).gte === range.data.gte &&
            valueRangeSchema.parse(dv).lte === range.data.lte
        );
      }
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-4 flex flex-col gap-4 w-full"
      key={identifier}>
      <span className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">{displayName}</h2>
        <button
          onClick={() => clearParams(identifier)}
          className="text-xl font-bold">
          clear
        </button>
      </span>
      <ul>
        {options.map((option) => (
          <li
            key={option.displayValue}
            className="text-xl flex flex-row gap-3">
            <input
              type="checkbox"
              id={option.identifier}
              name={option.displayValue}
              checked={isChecked(option.value)}
              onChange={(e) =>
                updateParams(identifier, option.value, e.target.checked)
              }
            />
            <div className="flex justify-between w-full ">
              {option.displayValue}
              <span className="text-gray-400">{option.productCount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
