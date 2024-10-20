import { TbCheck, TbStarFilled, TbX } from 'react-icons/tb';
import type { Product } from '../types/listings';
import { motion } from 'framer-motion';
import { UseFacetParamsReturn } from '../types/query';

type ProductCardProps = {
  details: Product;
  updateParams: UseFacetParamsReturn['updateParams'];
};

export const ProductCard = ({ details, updateParams }: ProductCardProps) => {
  const formatPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: details.price.currencyCode,
  });

  const inStock = details.stockStatus.status === 'G';

  return (
    <motion.div
      key={details.id}
      className="bg-white p-2 rounded-2xl flex flex-col gap-4 justify-between overflow-hidden">
      <div className="relative w-full">
        <img
          src={details.image.url}
          alt={details.image.attributes.imageAltText}
          className="w-full object-cover rounded-xl"
        />
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-end items-start">
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => updateParams('brands', details.brand.name, true)}>
              <img
                src={details.brand.brandImage?.url}
                alt={details.brand.name}
                className="w-20 shrink object-contain rounded-md"
              />
            </motion.button>
          </div>
        </div>
      </div>

      <h2 className="text-md font-bold">{details.productName}</h2>

      <div className="w-full flex flex-row items-center gap-3">
        <h1 className="text-3xl font-bold">
          {formatPrice.format(details.price.priceIncTax)}
        </h1>

        {details.price.wasPriceIncTax && (
          <h1 className="text-2xl font-bold text-gray-300 line-through">
            {formatPrice.format(details.price.wasPriceIncTax)}
          </h1>
        )}
      </div>

      <div className="w-full flex flex-row items-end justify-between flex-wrap">
        <div className="text-md flex font-bold flex-row p-1 px-2 rounded-3xl justify-between items-center gap-2">
          {inStock ? (
            <span className="flex flex-row items-center justify-center gap-3">
              <span className="text-green-500 text-2xl">
                <TbCheck />
              </span>
              In stock
            </span>
          ) : (
            <span className="flex flex-row items-center justify-center gap-2">
              <span className="text-red-500 text-2xl">
                <TbX />
              </span>
              Out of stock
            </span>
          )}
        </div>

        {details.averageRating && details.reviewsCount && (
          <div className="text-md flex flex-row p-1 px-2 rounded-3xl items-center gap-2">
            <span className="text-yellow-400 text-2xl ">
              <TbStarFilled />
            </span>

            <div className="w-full flex justify-between">
              <span className="font-bold pr-2">
                {details.averageRating} stars
              </span>
              <span className="font-bold">({details.reviewsCount})</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
