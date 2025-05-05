import React from "react";

const RightArrowCircle = ({height="28", width="28", ...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={height}
      height={height}
      {...props}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.7026" cy="14.1333" r="13.7026" fill="#00827E" />
      <path
        d="M6.60938 14.0047H19.2918M19.2918 14.0047L14.383 9.10645M19.2918 14.0047L14.4607 19.1618"
        stroke="white"
        stroke-width="1.64697"
      />
    </svg>
  );
}


export default RightArrowCircle;
