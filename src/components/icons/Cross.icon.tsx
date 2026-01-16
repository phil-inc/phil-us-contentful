import React from "react";

const CrossIcon = ({
  height = "20",
  width = "20",
  color = "#0A5552",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        width={height}
        height={height}
        {...props}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 5L5 15"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 5L15 15"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default CrossIcon;
