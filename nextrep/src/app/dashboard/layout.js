import TrainerNav from "@/components/TrainerNav";

export default function TrainerLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <TrainerNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
