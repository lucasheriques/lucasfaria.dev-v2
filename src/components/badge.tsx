export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full bg-gray-700 px-2 py-1 text-xs font-semibold text-white ${className}`}
    >
      {children}
    </span>
  );
}
