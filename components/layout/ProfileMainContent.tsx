export default function ProfileMainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-(--navbar-height) transition-all duration-300 md:pl-56">
      {children}
    </main>
  );
}
