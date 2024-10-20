import { UseFacetParamsReturn } from '../types/query';
import { FacetValue } from '../types/listings';
import { motion } from 'framer-motion';
import { TbX } from 'react-icons/tb';

type AppliedProps = {
  getAllFacetValues: UseFacetParamsReturn['getAllFacetValues'];
  clearAllFacetValues: UseFacetParamsReturn['clearAllFacetValues'];
  updateParams: UseFacetParamsReturn['updateParams'];
};

export const AppliedFacets = ({
  getAllFacetValues,
  updateParams,
  clearAllFacetValues,
}: AppliedProps) => {
  const appliedFacets = getAllFacetValues();

  const handleClearItem = (
    identifier: string | undefined,
    value: FacetValue | undefined
  ) => {
    if (!identifier || !value) return;
    updateParams(identifier, value, false);
  };

  const appliedFacetsLength = appliedFacets.length;

  if (appliedFacetsLength === 0) return null;

  return (
    <motion.div className="p-3 bg-white rounded-2xl flex flex-col gap-3">
      <motion.div
        layout="preserve-aspect"
        className="flex flex-row justify-between items-center gap-2">
        <h2 className="text-xl font-semibold p-1 rounded-2xl w-full px-2 ">
          Applied filters ({appliedFacetsLength})
        </h2>
      </motion.div>

      {appliedFacets.map((facet) =>
        facet.values.map((facetOption) => (
          <motion.div
            className="flex flex-row items-center"
            key={facetOption?.displayValue}>
            <button
              className="bg-blue-100 p-1 rounded-full text-2xl mr-3"
              onClick={() =>
                handleClearItem(facet.facet?.identifier, facetOption?.value)
              }>
              <TbX />
            </button>
            <div className="font-semibold text-lg pr-2">
              {facet.facet?.displayName}:
            </div>
            <div className="text-lg truncate">{facetOption?.displayValue}</div>
          </motion.div>
        ))
      )}

      <motion.button
        className="w-full bg-gray-100 p-2 rounded-xl font-semibold"
        onClick={clearAllFacetValues}>
        Clear all
      </motion.button>
    </motion.div>
  );
};
