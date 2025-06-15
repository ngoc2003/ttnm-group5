// components/customer-detail-modal.tsx
"use client";

import FootballPitchCard from "@/app/components/pitch-card";
import { Booking, Customer, Review } from "@/app/types";
import { Dialog } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}
export default function CustomerDetailModal({
  isOpen,
  onClose,
  customer,
}: CustomerDetailModalProps) {
  if (!customer) return null;

  console.log(customer);

  const dummyPitches = Array(customer.bookings).fill({
    image: "/football_field.png",
    openTime: "05:00 - 22:00",
    pitchType: "Sân bóng đá",
    name: "Sân bóng La Thành",
    location: "Quận Thanh Xuân, Hà Nội",
    ratingCount: 0,
  });

  const dummyReviews = Array(customer.reviews).fill({
    date: "2023-10-01",
    rating: 5,
    comment: "Sân bóng rất đẹp và sạch sẽ!",
    stadium: "Sân bóng La Thành",
    location: "Quận Thanh Xuân, Hà Nội",
  });

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/30"
    >
      <div className="flex items-center justify-center h-screen px-4 ">
        <Dialog.Panel className="bg-white rounded-xl max-w-3xl w-full p-6 relative !max-h-[90vh] overflow-scroll m-auto">
          <button onClick={onClose} className="absolute top-4 right-6 text-xl">
            ×
          </button>
          <Dialog.Title className="text-3xl font-bold text-center mb-4">
            {customer.name}
          </Dialog.Title>

          <div className="grid grid-cols-2 text-sm mb-6">
            <div>
              <p>CCCD: {customer.cccd}</p>
              <p>Địa chỉ: {customer.address}</p>
            </div>
            <div>
              <p>Số điện thoại: {customer.phone}</p>
              <p>Trạng thái: {customer.active ? "Kích hoạt" : "Khóa"}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Lịch sử đặt sân ( {dummyPitches.length} )
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {dummyPitches.map((booking: Booking, i: number) => (
              <FootballPitchCard key={i} {...booking} />
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Đánh giá ( {dummyReviews.length} )
          </h3>
          {dummyReviews.map((review: Review, i: number) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg shadow p-3 flex flex-col gap-1 mb-2"
            >
              <p className="font-semibold">{customer.name}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-600 mt-1">
                🏟 {review.stadium} - {review.location}
              </p>
            </div>
          ))}

          <div className="text-center mt-6">
            <button onClick={onClose} className="border px-6 py-2 rounded-lg">
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
