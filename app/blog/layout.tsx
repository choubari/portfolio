export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-20 sm:py-28">{children}</div>;
}
