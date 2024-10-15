import { Facet } from '../types/listings';

export const Sidebar = ({ facets }: { facets: Facet[] }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {facets?.map((facet) => (
        <FacetCard
          key={facet.displayName}
          details={facet}
        />
      ))}
    </div>
  );
};

const FacetCard = ({ details }: { details: Facet }) => {
  const { displayName, options, identifier } = details;

  return (
    <div
      className="bg-white rounded-2xl p-4 flex flex-col gap-4 w-full"
      key={identifier}>
      <h2 className="text-2xl font-bold">{displayName}</h2>

      <ul>
        {options.map((option) => (
          <li
            key={option.displayValue}
            className="text-xl flex flex-row gap-3">
            <input
              type="checkbox"
              id={option.displayValue}
              name={option.displayValue}
              value={option.displayValue}
            />
            {option.displayValue}
          </li>
        ))}
      </ul>
    </div>
  );
};
