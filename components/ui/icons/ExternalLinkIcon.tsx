interface ExternalLinkIconProps {
  className?: string;
  size?: number;
}

export function ExternalLinkIcon({
  className = "",
  size = 20,
}: ExternalLinkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 10.833V15.833A1.667 1.667 0 0 1 13.333 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V6.667A1.667 1.667 0 0 1 4.167 5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 2.5h5v5M17.5 2.5l-8.75 8.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
