import type { Product } from '../types/listings';

export const ProductCard = ({ details }: { details: Product }) => {
  return (
    <div
      key={details.id}
      className="bg-white p-2 rounded-xl flex flex-col gap-4 ">
      <img
        src={details.image.url}
        alt={details.image.attributes.imageAltText}
        className="w-full object-cover rounded-xl"
      />

      <h2 className="text-lg font-bold">{details.productName}</h2>
    </div>
  );
};
