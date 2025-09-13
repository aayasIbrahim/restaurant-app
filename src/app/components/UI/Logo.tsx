import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="https://logolook.net/wp-content/uploads/2023/11/FoodPanda-Logo-2012.png"
      alt="FoodPanda Logo"
      width={500}
      height={500}
      priority
      className="cursor-pointer h-[90px] w-[130px]"
    />
  );
};

export default Logo;
