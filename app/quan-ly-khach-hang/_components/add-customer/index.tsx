import { Customer } from "@/app/types";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

export default function AddCustomerModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Customer) => void;
}) {
  const [form, setForm] = useState({
    username: "",
    name: "",
    phone: "",
    cccd: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidPassword = () => {
    const { password, confirmPassword } = form;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const longEnough = password.length >= 6;
    const match = password === confirmPassword;
    return { hasNumber, hasLetter, longEnough, match };
  };

  const handleSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...remain } = form;
    onSubmit(remain as Customer);
    onClose();
  };

  const pwdValid = isValidPassword();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold text-black">Thêm khách hàng</h2>
            <button onClick={onClose}>
              <CgClose className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tên đăng nhập:</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Họ tên:</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">SDT:</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CCCD:</label>
              <input
                name="cccd"
                value={form.cccd}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Địa chỉ:</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Nhập lại mật khẩu:</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          {/* Password rules */}
          <div className="mt-6 space-y-2">
            <p
              className={
                pwdValid.hasNumber ? "text-green-700" : "text-gray-400"
              }
            >
              <span className="inline-block mr-1">
                <BsFillCheckCircleFill />
              </span>
              Bao gồm số
            </p>
            <p
              className={
                pwdValid.hasLetter ? "text-green-700" : "text-gray-400"
              }
            >
              <span className="inline-block mr-1">
                <BsFillCheckCircleFill />
              </span>
              Bao gồm chữ
            </p>
            <p
              className={
                pwdValid.longEnough ? "text-green-700" : "text-gray-400"
              }
            >
              <span className="inline-block mr-1">
                <BsFillCheckCircleFill />
              </span>
              Độ dài từ 6 ký tự
            </p>
            <p className={pwdValid.match ? "text-green-700" : "text-gray-400"}>
              <span className="inline-block mr-1">
                <BsFillCheckCircleFill />
              </span>
              Mật khẩu khớp nhau
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Thêm
            </button>
            <button
              onClick={onClose}
              className="border px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
