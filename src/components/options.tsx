import { motion } from 'framer-motion';
import { TbArrowDown, TbArrowUp, TbSparkles } from 'react-icons/tb';
import { MdOutlineDiscount } from 'react-icons/md';

type OptionsProps = {
  setSort: (sort: number) => void;
  currentSort: number;
  totalProducts: number;
};

export const SortOptions = ({
  setSort,
  currentSort,
  totalProducts,
}: OptionsProps) => {
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
    <motion.div className="p-3 bg-white rounded-2xl flex flex-col gap-1">
      <h2 className="text-xl font-semibold p-2 rounded-2xl w-full px-2 ">
        {totalProducts} Results
      </h2>
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
