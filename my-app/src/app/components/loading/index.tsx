import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <TailSpin
      visible={true}
      height="20"
      width="20"
      color="#ffff"
      ariaLabel="tail-spin-loading"
      radius="2"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loading;
