"use client";
import FootballPitchCard from "@/app/components/pitch-card";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const dummyPitches = Array(6).fill({
  image: "/football_field.png",
  openTime: "05:00 - 22:00",
  pitchType: "Sân bóng đá",
  name: "Sân bóng La Thành",
  location: "Quận Thanh Xuân, Hà Nội",
  ratingCount: 0,
});

const NextArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} right-0 z-10 !text-black hover:text-red-500`}
      onClick={onClick}
    >
      <FaChevronRight size={24} />
    </div>
  );
};

const PrevArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} left-0 z-10 !text-black hover:text-red-500`}
      onClick={onClick}
    >
      <FaChevronLeft size={24} />
    </div>
  );
};

const Section = ({
  title,
  subtitle,
  isSlider = false,
}: {
  title: string;
  subtitle?: string;
  isSlider?: boolean;
}) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        {subtitle && <p className="text-gray-400 mb-6">{subtitle}</p>}

        {isSlider ? (
          <Slider {...sliderSettings}>
            {dummyPitches.map((pitch, idx) => (
              <div key={idx} className="px-2">
                <FootballPitchCard {...pitch} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyPitches.map((pitch, idx) => (
              <FootballPitchCard key={idx} {...pitch} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Section;
