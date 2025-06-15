"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCity, FaFutbol, FaMapMarkerAlt } from "react-icons/fa";

export default function Banner() {
  const [filters, setFilters] = useState({
    sport: "",
    city: "",
    district: "",
  });

  const handleChange =
    (field: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <section
      className="relative bg-cover bg-center h-[500px] flex flex-col justify-center text-white mb-20"
      style={{ backgroundImage: `url('/stadium.png')` }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-red-500">BFP -</span> Ứng dụng đặt sân tập thể
          thao hàng đầu tại Việt Nam.
        </h1>
        <p className="text-sm md:text-base mb-4">
          Mang đến trải nghiệm đặt sân trực tuyến thuận tiện và linh hoạt cho
          người chơi.
        </p>

        {/* App download buttons */}
        <div className="flex space-x-4 mt-4">
          <Image
            src="/applestore.svg"
            alt="App Store"
            width={120}
            height={40}
          />
          <Image src="/chplay.png" alt="Google Play" width={150} height={40} />
        </div>
      </div>

      {/* Search Box */}
      <div className="absolute left-1/2 bottom-[-50px] transform -translate-x-1/2 w-full max-w-5xl z-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
          <div className="flex flex-col w-full md:w-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-900">
              Đặt sân thể thao ngay
            </h2>
            <p className="text-gray-400 text-sm md:text-base my-4">
              Tìm kiếm sân chơi thể thao, thi đấu khắp cả nước
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between w-full">
            {/* Sport Type */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1">
              <FaFutbol className="text-gray-500 mr-2" />
              <select
                className="pl-1 border-l border-l-gray-300 bg-transparent outline-none w-full text-gray-500"
                value={filters.sport}
                onChange={handleChange("sport")}
              >
                <option value="">Chọn môn thể thao</option>
                <option value="bong-da">Bóng đá</option>
                <option value="bong-ro">Bóng rổ</option>
              </select>
            </div>

            {/* City */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1">
              <FaCity className="text-gray-500 mr-2" />
              <select
                className="pl-1 border-l border-l-gray-300 bg-transparent outline-none w-full text-gray-500"
                value={filters.city}
                onChange={handleChange("city")}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                <option value="ha-noi">Hà Nội</option>
                <option value="ho-chi-minh">Hồ Chí Minh</option>
              </select>
            </div>

            {/* District */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <select
                className="pl-1 border-l border-l-gray-300 bg-transparent outline-none w-full text-gray-500"
                value={filters.district}
                onChange={handleChange("district")}
              >
                <option value="">Chọn quận/huyện</option>
                <option value="quan-1">Quận 1</option>
                <option value="quan-2">Quận 2</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="bg-[#ff1654] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e0144d] w-full md:w-auto">
              Tìm kiếm ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
