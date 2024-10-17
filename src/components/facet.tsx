import { useState } from 'react';
import { useFacetParams } from '../hooks/useFacetParams';
import { valueRangeSchema, valueRangeArraySchema } from '../schemas/facets';
import { Facet, FacetValue } from '../types/listings';
import { LayoutGroup, motion } from 'framer-motion';
import { TbArrowDown, TbArrowUp, TbX } from 'react-icons/tb';

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

  const [isOpen, setIsOpen] = useState(false);

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
    <LayoutGroup>
      <motion.div
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        layout
        style={{ borderRadius: '20px' }}
        className="bg-white rounded-2xl p-3 flex flex-col gap-4 w-full h-auto"
        key={identifier}>
        <motion.div
          layout="preserve-aspect"
          className="flex flex-row justify-between items-center gap-3">
          <h2 className="text-xl font-bold bg-gray-100 p-2 rounded-2xl w-full text-center">
            {displayName}
          </h2>

          <span className="flex justify-center items-center text-2xl font-bold gap-3">
            <button
              onClick={() => clearParams(identifier)}
              className="bg-gray-100 rounded-full p-2">
              <TbX />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-100 rounded-full p-2">
              {isOpen ? <TbArrowUp /> : <TbArrowDown />}
            </button>
          </span>
        </motion.div>

        {isOpen && (
          <motion.div layout="preserve-aspect">
            {options.map((option) => (
              <div
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
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </LayoutGroup>
  );
};
