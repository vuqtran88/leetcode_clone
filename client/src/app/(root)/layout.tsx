export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav>
        Nav bar
      </nav>
      {children}
    </div>
  );
}
