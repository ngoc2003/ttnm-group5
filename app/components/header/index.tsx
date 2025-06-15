"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="BFP Logo" width={100} height={62} />
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6 text-[16px] font-medium text-black">
        <Link href="/" className="text-blue-600 font-semibold">
          Home
        </Link>
        <Link href="/dat-san">Đặt sân</Link>
        <Link href="/thanh-toan">Thanh toán</Link>
        <Link href="/quan-ly-khach-hang">Quản lý khách hàng</Link>
        <Link href="/quan-ly-san">Quản lý sân</Link>
        <Link href="/quan-ly-tai-khoan">Quản lý tài khoản</Link>
      </nav>

      {/* User Info */}
      <div className="flex items-center space-x-2">
        <span className="font-medium">Vũ Quang Nhật</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-[2px] stroke-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
          />
        </svg>
      </div>
    </header>
  );
}
