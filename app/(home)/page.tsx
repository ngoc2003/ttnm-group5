import HomePageClient from "./client";
import Section from "./_components/section";

export default function Home() {
  return (
    <>
      <HomePageClient />
      <Section
        title="Sân tập gần bạn"
        subtitle="Khu vực được đề xuất gần vị trí của bạn"
        isSlider
      />
      <Section
        title="Đề xuất cho bạn"
        subtitle="Sân tập được người chơi đánh giá cao và gần bạn nhất"
        isSlider
      />
      <Section title="Sân tập tốt nhất được lựa chọn" />
    </>
  );
}
