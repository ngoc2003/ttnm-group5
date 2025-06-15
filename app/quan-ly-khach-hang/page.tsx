import CustomerPageClient from "./client";

export default function QuanLyKhachHang() {
  return <CustomerPageClient />;
}
export const metadata = {
  title: "Quản lý khách hàng",
  description: "Trang quản lý khách hàng của hệ thống BFP",
};
export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
