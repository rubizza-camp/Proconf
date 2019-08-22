import React, { lazy, Suspense } from "react";

const Spinner = () => {
  return <div>Loading...</div>;
};

export default (
  loadFn: () => Promise<{
    default: React.ComponentType<any>;
  }>,
  AnSpinner?: JSX.Element
) => {
  const AnComponent = lazy(loadFn);

  return () => {
    return (
      <Suspense fallback={AnSpinner || Spinner}>
        <AnComponent />
      </Suspense>
    );
  };
};
