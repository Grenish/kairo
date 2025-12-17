export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-foreground">{children}</div>;
}
