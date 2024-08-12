// import { useEffect, useState } from "react";

// function useMediaQuery(query: string) {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     const mediaQueryList = window.matchMedia(query);
//     const documentChangeHandler = () => setMatches(mediaQueryList.matches);

//     documentChangeHandler(); // Set initial value
//     mediaQueryList.addListener(documentChangeHandler);

//     return () => mediaQueryList.removeListener(documentChangeHandler);
//   }, [query]);

//   return matches;
// }

// export default useMediaQuery;

import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
