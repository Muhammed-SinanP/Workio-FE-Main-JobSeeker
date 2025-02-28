import React, { useEffect } from "react";
import ErrorDiv from "../../components/ErrorDiv";

const ErrorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <ErrorDiv info={"No such page exists."} />;
};

export default ErrorPage;
