export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  );
}
