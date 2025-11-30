interface HeadingProps {
  level: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, children, className = "" }: HeadingProps) {
  const baseStyles = "font-semibold text-gray-900";
  
  const levelStyles = {
    h1: "text-[48px] leading-[60px] tracking-[-0.02em] text-gray-900",
    h2: "text-2xl leading-8",
    h3: "text-xl leading-7",
  };

  const Component = level;

  return (
    <Component className={`${baseStyles} ${levelStyles[level]} ${className}`}>
      {children}
    </Component>
  );
}
