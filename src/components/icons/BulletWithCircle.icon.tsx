import React from "react";

const BulletWithCircle = ({
  height = "24",
  width = "24",
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.875 21.375C17.1217 21.375 21.375 17.1217 21.375 11.875C21.375 6.62829 17.1217 2.375 11.875 2.375C6.62829 2.375 2.375 6.62829 2.375 11.875C2.375 17.1217 6.62829 21.375 11.875 21.375Z"
          fill="white"
          stroke="#14D8D2"
          stroke-width="4.75"
        />
        <path
          d="M11.875 16.626C14.4984 16.626 16.625 14.4993 16.625 11.876C16.625 9.25262 14.4984 7.12598 11.875 7.12598C9.25165 7.12598 7.125 9.25262 7.125 11.876C7.125 14.4993 9.25165 16.626 11.875 16.626Z"
          fill="#00827E"
        />
      </svg>
    </>
  );
};

export default BulletWithCircle;
