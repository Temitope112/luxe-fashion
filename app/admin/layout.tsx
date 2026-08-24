import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminSidebar />

      <AdminHeader />

      <main className="min-h-screen pt-20 lg:ml-64">
        {children}
      </main>
    </div>
  );
}