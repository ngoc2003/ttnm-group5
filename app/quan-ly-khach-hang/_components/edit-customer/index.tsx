"use client";

import { Customer } from "@/app/types";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  onSubmit: (updated: Customer) => void;
}

export default function EditCustomerModal({
  isOpen,
  onClose,
  customer,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<Customer | null>(null);

  useEffect(() => {
    if (customer) setFormData({ ...customer });
  }, [customer]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData!);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-bold">
              Sửa khách hàng
            </Dialog.Title>
            <button onClick={onClose} className="text-2xl font-semibold">
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Tên đăng nhập</label>
              <input
                disabled
                value={formData.username}
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Họ tên</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">SĐT</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">CCCD</label>
              <input
                name="cccd"
                value={formData.cccd}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-1">Địa chỉ</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Sửa
            </button>
            <button
              onClick={onClose}
              className="border border-gray-400 px-6 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
