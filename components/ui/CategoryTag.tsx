interface CategoryTagProps {
  text: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CategoryTag({
  text,
  variant = "secondary",
  className = "",
}: CategoryTagProps) {
  const baseStyles = "text-sm font-medium text-primary-700 uppercase tracking-wide";
  
  const variantStyles = {
    primary: "bg-primary-100 px-3 py-1.5 rounded-md",
    secondary: "",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {text}
    </span>
  );
}
