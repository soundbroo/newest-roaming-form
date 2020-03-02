import React from "react";
import RoamingState from "pages/RoamingState";

export const redirectToStatusCheck = (result, setActivePage) => {
  setActivePage(2);
  return <RoamingState result={result} />;
};
