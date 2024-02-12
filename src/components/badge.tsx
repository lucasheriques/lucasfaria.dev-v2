export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
