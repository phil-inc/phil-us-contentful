import React from "react";

const TwinkleStar = ({
  height = "53",
  width = "53",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_14927_7494)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.9435 32.0866C27.0693 32.5762 34.837 25.5716 35.325 16.4751C34.837 25.5716 41.8401 33.3686 50.9365 33.8566C41.8401 33.3686 34.0446 40.3424 33.5566 49.4389C34.0446 40.3424 27.0693 32.5762 17.9435 32.0866Z"
          fill="#FFD93B"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.551003 39.6895C5.5526 39.9578 9.80708 36.1087 10.0738 31.1364C9.80708 36.1087 13.6546 40.3925 18.6269 40.6592C13.6546 40.3925 9.37244 44.2107 9.10412 49.2123C9.37244 44.2107 5.5526 39.9578 0.551003 39.6895ZM7.2323 12.4747C13.3161 12.801 18.4936 8.1508 18.8199 2.06699C18.4936 8.1508 23.1438 13.3283 29.2276 13.6546C23.1438 13.3283 17.9663 17.9785 17.64 24.0623C17.9663 17.9785 13.3161 12.801 7.2323 12.4747Z"
          fill="#FFB030"
        />
      </g>
      <defs>
        <clipPath id="clip0_14927_7494">
          <rect
            width="50"
            height="50"
            fill="white"
            transform="matrix(-0.998564 -0.053569 -0.053569 0.998564 52.6067 2.67845)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TwinkleStar;
