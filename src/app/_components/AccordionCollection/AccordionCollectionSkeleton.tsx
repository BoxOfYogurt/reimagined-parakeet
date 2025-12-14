type AccordionTeaserBlockSkeletonProps = {
  numberOfSkeletons: number;
};

export const AccordionCollectionSkeleton = ({
  numberOfSkeletons = 1,
}: AccordionTeaserBlockSkeletonProps) => {
  const skeletons = new Array(numberOfSkeletons).fill(null);

  return (
    <div role="status" aria-live="polite">
      <p className="sr-only">Loading accordion collection</p>
      <ul className="space-y-2">
        {skeletons.map((_, index) => (
          <li key={index}>
            <div
              role="presentation"
              className="bg-surface-sunken flex h-16 animate-pulse rounded-xl px-5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
