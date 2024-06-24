import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="page_screen flex gap-2  justify-center items-center text-primary text-sm font-medium">
      <Image
        src={"/logo.svg"}
        alt="loader"
        width={20}
        height={20}
        className="animate-spin"
      />{" "}
      <span className="text-gray-600">fetching your information</span>
    </div>
  );
};

export default loading;
