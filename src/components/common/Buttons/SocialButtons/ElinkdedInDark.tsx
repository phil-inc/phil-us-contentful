import React from "react";

export function ELinkedinIconDark({
  firstFill = "#007EBB",
  secondFill = "white",
  ...props
}: {
  firstFill?: string;
  secondFill?: string;
} & React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="11.8605" cy="12.1533" rx="11.8605" ry="12" fill="black" />
      <path
        d="M18.1391 17.2314H15.7121V13.3865C15.7121 12.4698 15.6962 11.2898 14.4503 11.2898C13.1862 11.2898 12.993 12.2881 12.993 13.3198V17.2302H10.5683V9.32536H12.8975V10.4053H12.9305C13.4045 9.58529 14.29 9.09303 15.2278 9.12869C17.6867 9.12869 18.1402 10.7653 18.1402 12.8942L18.1391 17.2314Z"
        fill="white"
      />
      <path
        d="M7.83032 8.24536C7.05732 8.24536 6.42188 7.60244 6.42188 6.82035C6.42188 6.03941 7.05732 5.39648 7.82918 5.39648C8.60104 5.39648 9.23649 6.03941 9.23649 6.82035C9.23763 7.60244 8.60218 8.24536 7.83032 8.24536Z"
        fill="white"
      />
      <path
        d="M9.04209 9.32546H6.61398V17.2303H9.04209V9.32546Z"
        fill="white"
      />
    </svg>
  );
}
