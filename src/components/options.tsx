import { motion } from 'framer-motion';
import { TbArrowDown, TbArrowUp, TbSparkles } from 'react-icons/tb';
import { MdOutlineDiscount } from 'react-icons/md';
import { UseFacetParamsReturn } from '../types/query';

type OptionsProps = {
  setSort: (sort: number) => void;
  currentSort: number;
};

export const SortOptions = ({ setSort, currentSort }: OptionsProps) => {
  type SortType = {
    name: string;
    value: number;
    icon: JSX.Element;
  };

  const sortTypes: SortType[] = [
    { name: 'Recommended', value: 1, icon: <TbSparkles /> },
    { name: 'Price Low to High', value: 2, icon: <TbArrowDown /> },
    { name: 'Price High to Low', value: 3, icon: <TbArrowUp /> },
    { name: 'Discount', value: 4, icon: <MdOutlineDiscount /> },
  ];

  return (
    <motion.div className="p-3 bg-white rounded-2xl">
      {sortTypes.map((sort) => (
        <motion.button
          key={sort.value}
          onClick={() => setSort(sort.value)}
          className="w-full p-2 text-left flex items-center gap-3">
          <span className="text-2xl relative p-1">
            {sort.value === currentSort && (
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-100"
                style={{ transform: 'scale(1.5)', zIndex: 0 }}
                transition={{ duration: 0.15 }}
                key="overlay"
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{sort.icon}</span>
          </span>
          <span className="ml-2 text-lg font-semibold">{sort.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

type AppliedProps = {
  clearParams: UseFacetParamsReturn['clearParams'];
  getAllValues: UseFacetParamsReturn['getQueryValues'];
};

export const AppliedFacets = ({ clearParams, getAllValues }: AppliedProps) => {
  return (
    <div className="bg-red-500">
      <h1 className="pb-5">FACET QUERYSTRING</h1>
      {JSON.stringify(getAllValues())}
    </div>
  );

  // return (
  //   <motion.div className="p-3 bg-white rounded-2xl">
  //     {sortTypes.map((sort) => (
  //       <motion.button
  //         key={sort.value}
  //         onClick={() => handleSort(sort)}
  //         className="w-full p-2 text-left flex items-center gap-3">
  //         <span className="text-2xl relative p-1">
  //           {sort.value === currentSort && (
  //             <motion.div
  //               className="absolute inset-0 rounded-full bg-blue-100"
  //               style={{ transform: 'scale(1.5)', zIndex: 0 }}
  //               transition={{ duration: 0.15 }}
  //               key="overlay"
  //             />
  //           )}
  //           <span style={{ position: 'relative', zIndex: 1 }}>{sort.icon}</span>
  //         </span>
  //         <span className="ml-2 text-lg font-semibold">{sort.name}</span>
  //       </motion.button>
  //     ))}
  //   </motion.div>
  // );
};
