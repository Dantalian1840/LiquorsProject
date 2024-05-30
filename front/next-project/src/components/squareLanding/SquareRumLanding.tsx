import React from "react";
import Link from "next/link";
const SquareRumLanding = () => {
  return (
    <div className="relative h-[25vw] w-[25vw]">
      <Link href="category/rum">
        <div className="absolute inset-0">
          <img
            src="/squareRum.png"
            alt="categoryImage"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 bg-amber-950 opacity-0 hover:opacity-80">
          <h2 className="text-center">RUM</h2>
        </div>
      </Link>
    </div>
  );
};

export default SquareRumLanding;
