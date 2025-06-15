import React from "react";
import { Dialog } from "@headlessui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isActivate?: boolean;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isActivate = false,
}: ConfirmModalProps) {
  const title = isActivate ? "Kích hoạt tài khoản" : "Khóa tài khoản";
  const message = `Bạn có chắc muốn ${
    isActivate ? "kích hoạt" : "khóa"
  } tài khoản x?`;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
          <div className="flex items-start gap-3">
            <IoInformationCircleOutline className="h-6 w-6 text-yellow-400 mt-1" />
            <div>
              <Dialog.Title className="text-lg font-bold text-black">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-700 mt-1">
                {message}
              </Dialog.Description>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black rounded-lg hover:bg-gray-50 transition"
            >
              Quay lại
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Có
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
