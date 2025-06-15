"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaPen } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { BiSearch } from "react-icons/bi";
import { customerColumns } from "./data";
import { customers as initialCustomers } from "./data";
import ConfirmModal from "./_components/confirm-modal";
import AddCustomerModal from "./_components/add-customer";
import EditCustomerModal from "./_components/edit-customer";
import CustomerDetailModal from "./_components/detail-customer";
import { Customer } from "../types";

export default function CustomerPageClient() {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [customerList, setCustomerList] = useState(initialCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [isActivateAction, setIsActivateAction] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const handleEditCustomer = (updatedCustomer: Customer) => {
    setCustomerList((prev) =>
      prev.map((cust) =>
        cust.id === updatedCustomer.id ? { ...cust, ...updatedCustomer } : cust
      )
    );
  };

  const handleDownload = () => {
    const headers = [
      "Tên",
      "CCCD",
      "Địa chỉ",
      "Số điện thoại",
      "Lượt đặt sân",
      "Lượt đánh giá",
      "Trạng thái",
    ];
    const rows = customerList.map((cust) => [
      cust.name,
      cust.cccd,
      cust.address,
      cust.phone,
      cust.bookings,
      cust.reviews,
      cust.active ? "Kích hoạt" : "Khóa",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "danh_sach_khach_hang.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddCustomer = (newCustomer: Customer) => {
    const newId = Math.max(...customerList.map((c) => c.id), 0) + 1;
    const formattedCustomer = {
      id: newId,
      name: newCustomer.name,
      cccd: newCustomer.cccd,
      address: newCustomer.address,
      phone: newCustomer.phone,
      bookings: 0,
      reviews: 0,
      active: true,
    };

    setCustomerList((prev) => [...prev, formattedCustomer]);
  };

  const handleToggleStatus = (custId: number, currentStatus: boolean) => {
    setSelectedCustomerId(custId);
    setIsActivateAction(!currentStatus);
    setShowModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedCustomerId === null) return;
    const updated = customerList.map((cust) =>
      cust.id === selectedCustomerId
        ? { ...cust, active: isActivateAction }
        : cust
    );
    setCustomerList(updated);
    setShowModal(false);
  };

  const filteredCustomers = customerList.filter((cust) => {
    const matchesStatus =
      filterStatus === "" ||
      (filterStatus === "active" && cust.active) ||
      (filterStatus === "inactive" && !cust.active);

    const matchesSearch =
      searchTerm.trim() === "" ||
      Object.values(cust)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleRowClick = (cust: Customer) => {
    setSelectedCustomer(cust);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div
        className="relative h-56 bg-cover bg-center"
        style={{ backgroundImage: `url('/stadium.png')` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-md">
            QUẢN LÝ KHÁCH HÀNG
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4 flex-wrap items-center">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Trạng thái</option>
              <option value="active">Kích hoạt</option>
              <option value="inactive">Khóa</option>
            </select>

            <div className="border flex border-gray-300 rounded-lg px-4 py-2">
              <BiSearch />
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 text-sm w-64 focus:outline-none focus:border-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Thêm mới +
            </button>
            <button
              onClick={handleDownload}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
            >
              Tải xuống <FaDownload />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase border-b border-b-gray-200">
              <tr>
                {customerColumns.map((header, idx) => (
                  <th key={idx} className="px-4 py-3 font-medium">
                    {header.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-gray-50 transition"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest("button") || target.closest("input"))
                      return;
                    handleRowClick(cust as Customer);
                  }}
                >
                  <td className="px-4 py-3">{cust.name}</td>
                  <td className="px-4 py-3">{cust.cccd}</td>
                  <td className="px-4 py-3">{cust.address}</td>
                  <td className="px-4 py-3">{cust.phone}</td>
                  <td className="px-4 py-3">{cust.bookings}</td>
                  <td className="px-4 py-3">{cust.reviews}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Switch
                      checked={cust.active}
                      onChange={() => handleToggleStatus(cust.id, cust.active)}
                      className={`${
                        cust.active ? "bg-blue-600" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${
                          cust.active ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                      />
                    </Switch>
                    <span>{cust.active ? "Kích hoạt" : "Khóa"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setEditingCustomer({
                          ...cust,
                          username: `user${cust.id}`,
                        }); // hoặc thay bằng username thực tế nếu có
                        setEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaPen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 text-sm pt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCustomer}
      />
      <EditCustomerModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        customer={editingCustomer}
        onSubmit={handleEditCustomer}
      />
      <CustomerDetailModal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />

      <ConfirmModal
        isOpen={showModal}
        isActivate={isActivateAction}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmStatusChange}
      />
    </div>
  );
}
