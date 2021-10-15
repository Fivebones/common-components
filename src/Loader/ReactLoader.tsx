import React from "react";
import Loader from "react-loader";
import loaderOptions from "./LoadingBar";
import LoaderTypes from "../types/Loader";

/**
 * The loader's intended parent should have the style `position: relative.`
 */
const ReactLoader = ({ position, loaded, children }: LoaderTypes) => {
  if (position) {
    loaderOptions.top = `${position}%`;
  }

  return (
    <Loader loaded={loaded} options={loaderOptions}>
      {children}
    </Loader>
  );
};

export default ReactLoader;
