export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-14 sm:py-20">{children}</div>;
}
