interface SubheadingProps {
  children: React.ReactNode;
  className?: string;
}

export function Subheading({ children, className = "" }: SubheadingProps) {
  return (
    <p className={`text-xl leading-[30px] font-normal text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
