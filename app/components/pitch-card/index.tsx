import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

interface FootballPitchCardProps {
  image: string;
  openTime: string;
  pitchType: string;
  name: string;
  location: string;
  ratingCount: number;
}

const FootballPitchCard: React.FC<FootballPitchCardProps> = ({
  image,
  openTime,
  pitchType,
  name,
  location,
  ratingCount,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-xs">
      <Image
        src={image}
        alt={name}
        width={300}
        height={0}
        className="rounded-lg object-cover h-auto max-h-[200px] mb-4"
      />
      <p className="text-sm text-gray-500">Mở cửa: {openTime}</p>
      <p className="text-sm text-gray-500 mb-2">Loại sân: {pitchType}</p>
      <p className="font-semibold text-black mb-1">● {name}</p>
      <div className="flex items-center text-sm text-gray-600">
        <FaMapMarkerAlt className="text-red-500 mr-1" />
        {location}
      </div>
      <div className="flex items-center text-sm text-gray-600 mt-1">
        <FaStar className="text-yellow-500 mr-1" />
        {ratingCount} lượt đánh giá
      </div>
    </div>
  );
};

export default FootballPitchCard;
