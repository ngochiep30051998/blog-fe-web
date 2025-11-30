import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Color-coded avatar backgrounds from Figma
const avatarColors: Record<string, string> = {
  "Olivia Rhye": "#C7B9DA",
  "Phoenix Baker": "#AA9C75",
  "Lana Steiner": "#D4B5AD",
  "Alec Whitten": "#ABB677",
  "Demi Wilkinson": "#BEA887",
  "Candice Wu": "#A2A8CD",
  "Natali Craig": "#D1BAA9",
  "Drew Cano": "#D1DFC3",
  "Orlando Diggs": "#CFC3A7",
};

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  className = "",
}: AvatarProps) {
  const backgroundColor = avatarColors[name] || "#D0D5DD";
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback: colored circle with initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center text-white text-xs font-medium ${className}`}
      style={{ backgroundColor }}
      aria-label={alt}
    >
      {initials}
    </div>
  );
}
