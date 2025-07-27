import ClientNav from "@/components/ClientNav";

export default function ClientLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <ClientNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
